export enum NodeAction {
    SKIP = 'skip',
    INVERT = 'invert'
}

export const hierarchy2 = [
    {
        Q1: [
        { 
            action: NodeAction.INVERT,
            Apr: 73.1, 
        },
        { May: 18.5 },
        { Jun: 30.3 }
        ],
        
    },
    {
        Q2: [
        { 
            action: NodeAction.SKIP,
            Apr: 113.4, 
        },
        { May: 46.4 },
        { Jun: 42.7 }
        ],
        
    },
    {
        Q3: [
        { Jul: 113.4 },
        { Aug: 46.4 },
        { Sep: 42.7 }
        ]
    },
    {
        Q4: [
        { Oct: 115.5 },
        { 
            action: NodeAction.INVERT, 
            Nov: 24.8, 
        },
        { Dec: 97.2 }
        ],
        
    }
]

export const hierarchy3 = [
    {
        Q1: [
        {
            Jan: [
                { Week1: 8.3 },
                { Week2: 14.1 },
                { Week3: 11.9 },
                { Week4: 6.4 }
            ]
        },
        {
            Feb: [
                { 
                    Week1: 21.0,
                    action: NodeAction.INVERT
                },
                { Week2: 9.9 },
                { Week3: 7.1 },
                { Week4: 1.2 }
            ]
        },
        {
            Mar: [
                { Week1: 12.5 },
                { Week2: 14.5 },
                { 
                    Week3: 18.1,
                    action: NodeAction.SKIP 
                },
                { Week4: 7.8 }
            ]
        }
        ]
    },
    {
        Q2: [
        {
            Apr: [
                { 
                    Week1: 25.0, 
                    action: NodeAction.SKIP 
                },
                { Week2: 20.0 },
                { Week3: 18.0 },
                { Week4: 10.4 }
            ]
        },
        {
            May: [
                { 
                    Week1: 35.0,
                    action: NodeAction.INVERT
                },
                { Week2: 12.3 },
                { Week3: 9.8 },
                { Week4: 5.6 }
            ]
        },
        {
            Jun: [
                { Week1: 20.0 },
                { Week2: 14.5 },
                { Week3: 8.9 },
                { Week4: 7.3 }
            ]
        }
        ]
    },
    {
        Q3: [
        {
            Jul: [
                { Week1: 25.0 },
                { Week2: 20.0 },
                { Week3: 18.0 },
                { Week4: 10.4 }
            ]
        },
        {
            Aug: [
                { Week1: 15.0 },
                { Week2: 12.3 },
                { Week3: 9.8 },
                { Week4: 5.6 }
            ]
        },
        {
            Sep: [
                { Week1: 20.0 },
                { Week2: 14.5 },
                { Week3: 8.9 },
                { Week4: 7.3 }
            ]
        }
        ]
    },
    {
        Q4: [
        {
            Oct: [
                { Week1: 25.0 },
                { Week2: 20.0 },
                { 
                    Week3: 18.0, 
                    action: NodeAction.SKIP
                 },
                { Week4: 10.4 }
            ]
        },
        {
            Nov: [
                { Week1: 5.1 },
                { Week2: 12.3 },
                { Week3: 19.2 },
                { Week4: 15.1 }
            ]
        },
        {
            Dec: [
                { Week1: 7.0 },
                { Week2: 8.5 },
                { 
                    Week3: 34.9, 
                    action: NodeAction.INVERT
                },
                { Week4: 7.7 }
            ]
        }
        ]
    }
];