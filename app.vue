<template>
  <div ref="table"></div>
  <div
    class="flex flex-col w-[18%] absolute top-2 right-2 gap-1 bg-white p-1 border border-solid border-gray rounded-xl"
    v-if="showContextMenu"
  >
    <!-- FONT -->
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline"> Change font </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>Selected font</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          v-model="activeFont"
          @click="performAction(ActionType.FONT_CHANGE)"
        >
          <DropdownMenuRadioItem value="inter"> Inter </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="lobster"> Lobster </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="georgia"> Georgia </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- COLOR -->
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline"> Change header color </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-[270px]">
        <DropdownMenuLabel>Selected header background color</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          v-model="activeHeaderColor"
          @click="performAction(ActionType.COLOR_CHANGE)"
        >
          <DropdownMenuRadioItem value="light-gray"> Light Gray </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light-blue"> Light Blue </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light-green"> Light Green </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- FILTER -->
    <Button variant="outline" @click="performAction(ActionType.FILTER_NEGATIVE)">
      {{
        Object.keys(filteredSums).length === 0
          ? "Filter negative values"
          : "Show all values"
      }}
    </Button>

    <!-- INVERT -->
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline"> Invert selected period </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-[270px]">
        <DropdownMenuLabel>Selected period</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          v-model="selectedPeriod"
          @click="performAction(ActionType.INVERT)"
        >
          <div v-for="period in allPeriods" :key="period">
            <DropdownMenuRadioItem :value="period">
              {{ period }}
            </DropdownMenuRadioItem>
          </div>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { hierarchy2, hierarchy3, NodeAction } from "./data";

enum ActionType {
  FONT_CHANGE = "font-change",
  COLOR_CHANGE = "color-change",
  FILTER_NEGATIVE = "filter-negative",
  INVERT = "invert",
}

interface Node {
  [key: string]: any;
}

const table = ref(null);
const showContextMenu = ref(false);
const sums = ref({});
const filteredSums = ref({});
const activeFont = ref("inter");
const activeHeaderColor = ref("light-gray");
const selectedPeriod = ref<string>();
const allPeriods = ref<string[]>([]);

onMounted(() => {
  sums.value = calculateSums({ root: hierarchy2 });
  allPeriods.value = Object.keys(sums.value);
  renderTable(sums.value);
});

const calculateSums = (node: Node, parentKey: string = ""): Record<string, number> => {
  let sums: Record<string, number> = {};
  let currentSum = 0;

  for (const key in node) {
    const value = node[key];
    if (Array.isArray(value)) {
      value.forEach((child) => {
        if (child.action) {
          switch (child.action) {
            case NodeAction.SKIP:
              break;
            case NodeAction.INVERT:
              processChildSums(child, key, sums, (sum, value) => sum - value);
              break;
          }
        } else {
          processChildSums(child, key, sums, (sum, value) => sum + value);
        }
      });
    } else if (typeof value === "number") {
      currentSum += value;
    }
  }

  addSumToParent(sums, parentKey, currentSum);
  return sums;
};

const renderTable = (sums: Object) => {
  const svg = d3
    .select(table.value)
    .append("table")
    .attr("border", 1)
    .style("border-collapse", "collapse")
    .style("width", "80%");

  const thead = svg.append("thead");
  const tbody = svg.append("tbody");

  thead
    .append("tr")
    .selectAll("th")
    .data(["Period", "Sum"])
    .enter()
    .append("th")
    .text((d) => d)
    .classed(activeHeaderColor.value, true)
    .style("padding", "8px")
    .style("border", "1px solid #ddd")
    .on("contextmenu", (e) => {
      e.preventDefault();
      showContextMenu.value = true;
    });

  const rows = tbody
    .selectAll("tr")
    .data(Object.entries(unref(sums)))
    .enter()
    .append("tr");

  rows
    .selectAll("td")
    .data((d) => d)
    .enter()
    .append("td")
    .text((d) => d as string | number)
    .style("padding", "8px")
    .style("border", "1px solid #ddd");
};

const processChildSums = (
  child: Object,
  parentKey: string,
  sums: Record<string, number>,
  action: (a: number, b: number) => number
) => {
  const childSums = calculateSums(child, parentKey);
  for (const childKey in childSums) {
    sums[childKey] = parseFloat(
      action(sums[childKey] || 0, childSums[childKey]).toFixed(2)
    );
  }
};

const addSumToParent = (
  sums: Record<string, number>,
  parentKey: string,
  currentSum: number
) => {
  if (parentKey && currentSum > 0) {
    sums[parentKey] = (sums[parentKey] || 0) + currentSum;
  }
};

const performAction = (action: ActionType) => {
  switch (action) {
    case ActionType.FONT_CHANGE:
      const oldFont = d3.select(table.value).attr("class");
      if (oldFont === null) {
        d3.select(table.value).classed(activeFont.value, true);
      } else {
        d3.select(table.value).classed(oldFont, false);
        d3.select(table.value).classed(activeFont.value, true);
      }
      break;

    case ActionType.COLOR_CHANGE:
      const oldColor = d3.select(table.value).select("th").attr("class");
      d3.select(table.value).selectAll("th").classed(oldColor, false);
      d3.select(table.value).selectAll("th").classed(activeHeaderColor.value, true);
      break;

    case ActionType.FILTER_NEGATIVE:
      if (table.value) {
        d3.select(table.value).selectAll("*").remove();
      }

      if (Object.keys(filteredSums.value).length === 0) {
        filteredSums.value = Object.fromEntries(
          Object.entries(sums.value).filter(([key, value]) => (value as number) >= 0)
        );

        allPeriods.value = Object.keys(filteredSums.value);
        renderTable(filteredSums.value);
      } else {
        filteredSums.value = {};
        allPeriods.value = Object.keys(sums.value);
        renderTable(sums.value);
      }
      break;

    case ActionType.INVERT:
      if (selectedPeriod.value) {
        Object.entries(sums.value).forEach(([key, val]) => {
          if (key === selectedPeriod.value) {
            (sums.value as Record<string, number>)[key] = -(val as number);
          }
        });

        if (table.value) {
          d3.select(table.value).selectAll("*").remove();
        }
        renderTable(sums);
      }
      break;
  }
  showContextMenu.value = false;
};
</script>
<style>
body,
.inter {
  font-family: "Inter", sans-serif;
}

.lobster {
  font-family: "Lobster", cursive;
}

.georgia {
  font-family: "Georgia", serif;
}

.light-gray {
  background-color: #efebeb;
}

.light-blue {
  background-color: #cedade;
}

.light-green {
  background-color: #cfe3cf;
}
</style>
