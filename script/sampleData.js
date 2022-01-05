const sampleData = {
  // Array
  "alternative": [
    "Riski",
    "Shania",
    "Anggun",
    "Oktadear",
    "Bayu"
  ],
  // Array
  "criteria": [
    "Keaktifan Organisasi",
    "Karya Tulis",
    "IPK"
  ],
  // ! Array -> Object (dump value (0, 1, 2, ...)) -> Array
  "rankCriteria": [
    {
      "0": [
        "Keaktifan Organisasi",
        "Karya Tulis",
        0.5
      ],
      "1": [
        "Keaktifan Organisasi",
        "IPK",
        3
      ],
      "2": [
        "Karya Tulis",
        "IPK",
        0.66666666666666666666666666666667
      ]
    }
  ],
  // ! Object (criteria as a key) -> Array (value)
  "criteriaItemRank": {
    "Keaktifan Organisasi": [
      90,
      75,
      90,
      70,
      90
    ],
    "Karya Tulis": [
      80,
      90,
      70,
      80,
      75
    ],
    "IPK": [
      3.5,
      3.8,
      3.3,
      3.4,
      3.5
    ]
  },
  // ! Object (criteria as a key) -> array -> Object (dump value (0, 1, 2, ...)) -> array (scale)
  "rankCriteriaItem": {
    "style": [
      {
        "0": [
          "civic",
          "saturn",
          0.25
        ],
        "1": [
          "civic",
          "escort",
          4
        ],
        "2": [
          "civic",
          "miata",
          0.16666666666666666
        ],
        "3": [
          "saturn",
          "escort",
          4
        ],
        "4": [
          "saturn",
          "miata",
          0.25
        ],
        "5": [
          "escort",
          "miata",
          0.2
        ]
      }
    ],
    "reliability": [
      {
        "0": [
          "civic",
          "saturn",
          2
        ],
        "1": [
          "civic",
          "escort",
          5
        ],
        "2": [
          "civic",
          "miata",
          1
        ],
        "3": [
          "saturn",
          "escort",
          3
        ],
        "4": [
          "saturn",
          "miata",
          2
        ],
        "5": [
          "escort",
          "miata",
          0.25
        ]
      }
    ]
  }
}

export default sampleData
