const applicationData = {
  "query_keys": [
    "relation w/ 2 joins",
    "relation w/ 3 queries",
    "relation w/ 2 subq",
    "relation w/ 1 subq, 2 joins",
    "jsonb w/ 1 subq",
    "array w/ 1 subq",
    "hstore w/ 1 subq",
    "jsonb w/ 2 queries",
    "hstore w/ 2 queries",
    "array w/ 2 queries"
  ],
  "data": {
    "realistic_product_search": {
      "details": {
        "queries": 1000,
        "description": "The graph below shows the result of making 1000 queries using commonly paired keywords."
      },
      "benchmarks": [
        {
          "query_key": "relation w/ 2 joins",
          "user": 0.73,
          "system": 0.05,
          "total": 0.78,
          "real": 8.663209
        },
        {
          "query_key": "relation w/ 3 queries",
          "user": 1.46,
          "system": 0.05,
          "total": 1.51,
          "real": 3.46629
        },
        {
          "query_key": "relation w/ 2 subq",
          "user": 0.64,
          "system": 0.02,
          "total": 0.66,
          "real": 3.218055
        },
        {
          "query_key": "relation w/ 1 subq, 2 joins",
          "user": 0.61,
          "system": 0.03,
          "total": 0.64,
          "real": 3.343036
        },
        {
          "query_key": "jsonb w/ 1 subq",
          "user": 0.59,
          "system": 0.01,
          "total": 0.6,
          "real": 4.561408
        },
        {
          "query_key": "array w/ 1 subq",
          "user": 0.57,
          "system": 0.03,
          "total": 0.6,
          "real": 5.495568
        },
        {
          "query_key": "hstore w/ 1 subq",
          "user": 0.55,
          "system": 0.02,
          "total": 0.57,
          "real": 5.05939
        },
        {
          "query_key": "jsonb w/ 2 queries",
          "user": 0.31,
          "system": 0.02,
          "total": 0.33,
          "real": 0.646059
        },
        {
          "query_key": "hstore w/ 2 queries",
          "user": 0.31,
          "system": 0.01,
          "total": 0.32,
          "real": 0.563775
        },
        {
          "query_key": "array w/ 2 queries",
          "user": 0.38,
          "system": 0.0,
          "total": 0.38,
          "real": 0.716811
        }
      ]
    },
    "product_search": {
      "details": {
        "queries": 1000,
        "description": "The graph below shows the result of making 1000 queries using the full keyword description of a random product."
      },
      "benchmarks": [
        {
          "query_key": "relation w/ 2 joins",
          "user": 0.65,
          "system": 0.02,
          "total": 0.67,
          "real": 11.325181
        },
        {
          "query_key": "relation w/ 3 queries",
          "user": 1.88,
          "system": 0.06,
          "total": 1.94,
          "real": 5.502888
        },
        {
          "query_key": "relation w/ 2 subq",
          "user": 0.48,
          "system": 0.01,
          "total": 0.49,
          "real": 5.835682
        },
        {
          "query_key": "relation w/ 1 subq, 2 joins",
          "user": 0.54,
          "system": 0.01,
          "total": 0.55,
          "real": 6.334611
        },
        {
          "query_key": "jsonb w/ 1 subq",
          "user": 0.43,
          "system": 0.04,
          "total": 0.47,
          "real": 7.258772
        },
        {
          "query_key": "array w/ 1 subq",
          "user": 0.46,
          "system": 0.03,
          "total": 0.49,
          "real": 7.84863
        },
        {
          "query_key": "hstore w/ 1 subq",
          "user": 0.44,
          "system": 0.04,
          "total": 0.48,
          "real": 7.670558
        },
        {
          "query_key": "jsonb w/ 2 queries",
          "user": 0.47,
          "system": 0.0,
          "total": 0.47,
          "real": 0.827564
        },
        {
          "query_key": "hstore w/ 2 queries",
          "user": 0.39,
          "system": 0.02,
          "total": 0.41,
          "real": 0.787863
        },
        {
          "query_key": "array w/ 2 queries",
          "user": 0.39,
          "system": 0.01,
          "total": 0.4,
          "real": 0.717765
        }
      ]
    },
    "random_keyword_search": [
      {
        "details": {
          "queries": 500,
          "keywords": 2,
          "description": "The graph below shows the result of making 500 queries of 2 keywords each. The keywords were randomly selected from the tag_names table."
        },
        "benchmarks": [
          {
            "query_key": "relation w/ 2 joins",
            "user": 0.17,
            "system": 0.02,
            "total": 0.19,
            "real": 0.684838
          },
          {
            "query_key": "relation w/ 3 queries",
            "user": 0.38,
            "system": 0.02,
            "total": 0.4,
            "real": 0.718846
          },
          {
            "query_key": "relation w/ 2 subq",
            "user": 0.13,
            "system": 0.01,
            "total": 0.14,
            "real": 0.457492
          },
          {
            "query_key": "relation w/ 1 subq, 2 joins",
            "user": 0.16,
            "system": 0.0,
            "total": 0.16,
            "real": 0.503837
          },
          {
            "query_key": "jsonb w/ 1 subq",
            "user": 0.2,
            "system": 0.01,
            "total": 0.21,
            "real": 1.637098
          },
          {
            "query_key": "array w/ 1 subq",
            "user": 0.2,
            "system": 0.01,
            "total": 0.21,
            "real": 1.822541
          },
          {
            "query_key": "hstore w/ 1 subq",
            "user": 0.2,
            "system": 0.0,
            "total": 0.2,
            "real": 1.634923
          },
          {
            "query_key": "jsonb w/ 2 queries",
            "user": 0.14,
            "system": 0.0,
            "total": 0.14,
            "real": 0.255193
          },
          {
            "query_key": "hstore w/ 2 queries",
            "user": 0.12,
            "system": 0.01,
            "total": 0.13,
            "real": 0.225804
          },
          {
            "query_key": "array w/ 2 queries",
            "user": 0.13,
            "system": 0.01,
            "total": 0.14,
            "real": 0.254495
          }
        ]
      },
      {
        "details": {
          "queries": 500,
          "keywords": 5,
          "description": "The graph below shows the result of making 500 queries of 5 keywords each. The keywords were randomly selected from the tag_names table."
        },
        "benchmarks": [
          {
            "query_key": "relation w/ 2 joins",
            "user": 0.16,
            "system": 0.01,
            "total": 0.17,
            "real": 0.866387
          },
          {
            "query_key": "relation w/ 3 queries",
            "user": 0.26,
            "system": 0.0,
            "total": 0.26,
            "real": 0.577715
          },
          {
            "query_key": "relation w/ 2 subq",
            "user": 0.13,
            "system": 0.0,
            "total": 0.13,
            "real": 0.512876
          },
          {
            "query_key": "relation w/ 1 subq, 2 joins",
            "user": 0.19,
            "system": 0.01,
            "total": 0.2,
            "real": 1.003842
          },
          {
            "query_key": "jsonb w/ 1 subq",
            "user": 0.19,
            "system": 0.01,
            "total": 0.2,
            "real": 2.400682
          },
          {
            "query_key": "array w/ 1 subq",
            "user": 0.21,
            "system": 0.01,
            "total": 0.22,
            "real": 2.280781
          },
          {
            "query_key": "hstore w/ 1 subq",
            "user": 0.19,
            "system": 0.01,
            "total": 0.2,
            "real": 2.551576
          },
          {
            "query_key": "jsonb w/ 2 queries",
            "user": 0.14,
            "system": 0.01,
            "total": 0.15,
            "real": 0.264547
          },
          {
            "query_key": "hstore w/ 2 queries",
            "user": 0.16,
            "system": 0.0,
            "total": 0.16,
            "real": 0.278741
          },
          {
            "query_key": "array w/ 2 queries",
            "user": 0.14,
            "system": 0.0,
            "total": 0.14,
            "real": 0.257063
          }
        ]
      },
      {
        "details": {
          "queries": 500,
          "keywords": 10,
          "description": "The graph below shows the result of making 500 queries of 10 keywords each. The keywords were randomly selected from the tag_names table."
        },
        "benchmarks": [
          {
            "query_key": "relation w/ 2 joins",
            "user": 0.23,
            "system": 0.01,
            "total": 0.24,
            "real": 3.138677
          },
          {
            "query_key": "relation w/ 3 queries",
            "user": 0.34,
            "system": 0.02,
            "total": 0.36,
            "real": 0.849136
          },
          {
            "query_key": "relation w/ 2 subq",
            "user": 0.19,
            "system": 0.03,
            "total": 0.22,
            "real": 2.138599
          },
          {
            "query_key": "relation w/ 1 subq, 2 joins",
            "user": 0.25,
            "system": 0.0,
            "total": 0.25,
            "real": 2.605662
          },
          {
            "query_key": "jsonb w/ 1 subq",
            "user": 0.22,
            "system": 0.01,
            "total": 0.23,
            "real": 3.441749
          },
          {
            "query_key": "array w/ 1 subq",
            "user": 0.2,
            "system": 0.03,
            "total": 0.23,
            "real": 3.655168
          },
          {
            "query_key": "hstore w/ 1 subq",
            "user": 0.21,
            "system": 0.01,
            "total": 0.22,
            "real": 3.578739
          },
          {
            "query_key": "jsonb w/ 2 queries",
            "user": 0.19,
            "system": 0.01,
            "total": 0.2,
            "real": 0.353569
          },
          {
            "query_key": "hstore w/ 2 queries",
            "user": 0.18,
            "system": 0.0,
            "total": 0.18,
            "real": 0.325309
          },
          {
            "query_key": "array w/ 2 queries",
            "user": 0.27,
            "system": 0.01,
            "total": 0.28,
            "real": 0.512515
          }
        ]
      },
      {
        "details": {
          "queries": 500,
          "keywords": 1,
          "description": "The graph below shows the result of making 500 queries of 1 keywords each. The keywords were randomly selected from the tag_names table."
        },
        "benchmarks": [
          {
            "query_key": "relation w/ 2 joins",
            "user": 0.4,
            "system": 0.0,
            "total": 0.4,
            "real": 0.823914
          },
          {
            "query_key": "relation w/ 3 queries",
            "user": 1.33,
            "system": 0.02,
            "total": 1.35,
            "real": 1.915412
          },
          {
            "query_key": "relation w/ 2 subq",
            "user": 0.48,
            "system": 0.01,
            "total": 0.49,
            "real": 1.028104
          },
          {
            "query_key": "relation w/ 1 subq, 2 joins",
            "user": 0.54,
            "system": 0.0,
            "total": 0.54,
            "real": 1.137333
          },
          {
            "query_key": "jsonb w/ 1 subq",
            "user": 0.61,
            "system": 0.02,
            "total": 0.63,
            "real": 1.96521
          },
          {
            "query_key": "array w/ 1 subq",
            "user": 0.68,
            "system": 0.02,
            "total": 0.7,
            "real": 2.433348
          },
          {
            "query_key": "hstore w/ 1 subq",
            "user": 0.52,
            "system": 0.01,
            "total": 0.53,
            "real": 1.705232
          },
          {
            "query_key": "jsonb w/ 2 queries",
            "user": 0.14,
            "system": 0.01,
            "total": 0.15,
            "real": 0.230709
          },
          {
            "query_key": "hstore w/ 2 queries",
            "user": 0.13,
            "system": 0.01,
            "total": 0.14,
            "real": 0.223473
          },
          {
            "query_key": "array w/ 2 queries",
            "user": 0.11,
            "system": 0.0,
            "total": 0.11,
            "real": 0.188354
          }
        ]
      },
      {
        "details": {
          "queries": 500,
          "keywords": 15,
          "description": "The graph below shows the result of making 500 queries of 15 keywords each. The keywords were randomly selected from the tag_names table."
        },
        "benchmarks": [
          {
            "query_key": "relation w/ 2 joins",
            "user": 0.24,
            "system": 0.01,
            "total": 0.25,
            "real": 2.493665
          },
          {
            "query_key": "relation w/ 3 queries",
            "user": 0.37,
            "system": 0.01,
            "total": 0.38,
            "real": 0.887588
          },
          {
            "query_key": "relation w/ 2 subq",
            "user": 0.23,
            "system": 0.01,
            "total": 0.24,
            "real": 2.280696
          },
          {
            "query_key": "relation w/ 1 subq, 2 joins",
            "user": 0.28,
            "system": 0.0,
            "total": 0.28,
            "real": 2.534614
          },
          {
            "query_key": "jsonb w/ 1 subq",
            "user": 0.24,
            "system": 0.01,
            "total": 0.25,
            "real": 3.915515
          },
          {
            "query_key": "array w/ 1 subq",
            "user": 0.22,
            "system": 0.01,
            "total": 0.23,
            "real": 4.136068
          },
          {
            "query_key": "hstore w/ 1 subq",
            "user": 0.22,
            "system": 0.02,
            "total": 0.24,
            "real": 4.152514
          },
          {
            "query_key": "jsonb w/ 2 queries",
            "user": 0.35,
            "system": 0.0,
            "total": 0.35,
            "real": 0.631601
          },
          {
            "query_key": "hstore w/ 2 queries",
            "user": 0.22,
            "system": 0.0,
            "total": 0.22,
            "real": 0.398178
          },
          {
            "query_key": "array w/ 2 queries",
            "user": 0.34,
            "system": 0.01,
            "total": 0.35,
            "real": 0.633292
          }
        ]
      }
    ]
  },
  "database_information": {
    "counts": {
      "products": 2107,
      "tag_names": 563,
      "tags": 27850
    }
  }
};

export default applicationData;