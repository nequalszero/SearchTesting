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
        "queries": 1000
      },
      "benchmarks": {
        "relation w/ 2 joins": {
          "user": 0.73,
          "system": 0.05,
          "total": 0.78,
          "real": 8.663209
        },
        "relation w/ 3 queries": {
          "user": 1.46,
          "system": 0.05,
          "total": 1.51,
          "real": 3.46629
        },
        "relation w/ 2 subq": {
          "user": 0.64,
          "system": 0.02,
          "total": 0.66,
          "real": 3.218055
        },
        "relation w/ 1 subq, 2 joins": {
          "user": 0.61,
          "system": 0.03,
          "total": 0.64,
          "real": 3.343036
        },
        "jsonb w/ 1 subq": {
          "user": 0.59,
          "system": 0.01,
          "total": 0.6,
          "real": 4.561408
        },
        "array w/ 1 subq": {
          "user": 0.57,
          "system": 0.03,
          "total": 0.6,
          "real": 5.495568
        },
        "hstore w/ 1 subq": {
          "user": 0.55,
          "system": 0.02,
          "total": 0.57,
          "real": 5.05939
        },
        "jsonb w/ 2 queries": {
          "user": 0.31,
          "system": 0.02,
          "total": 0.33,
          "real": 0.646059
        },
        "hstore w/ 2 queries": {
          "user": 0.31,
          "system": 0.01,
          "total": 0.32,
          "real": 0.563775
        },
        "array w/ 2 queries": {
          "user": 0.38,
          "system": 0.0,
          "total": 0.38,
          "real": 0.716811
        }
      }
    },
    "product_search": {
      "details": {
        "queries": 1000
      },
      "benchmarks": {
        "relation w/ 2 joins": {
          "user": 0.65,
          "system": 0.02,
          "total": 0.67,
          "real": 11.325181
        },
        "relation w/ 3 queries": {
          "user": 1.88,
          "system": 0.06,
          "total": 1.94,
          "real": 5.502888
        },
        "relation w/ 2 subq": {
          "user": 0.48,
          "system": 0.01,
          "total": 0.49,
          "real": 5.835682
        },
        "relation w/ 1 subq, 2 joins": {
          "user": 0.54,
          "system": 0.01,
          "total": 0.55,
          "real": 6.334611
        },
        "jsonb w/ 1 subq": {
          "user": 0.43,
          "system": 0.04,
          "total": 0.47,
          "real": 7.258772
        },
        "array w/ 1 subq": {
          "user": 0.46,
          "system": 0.03,
          "total": 0.49,
          "real": 7.84863
        },
        "hstore w/ 1 subq": {
          "user": 0.44,
          "system": 0.04,
          "total": 0.48,
          "real": 7.670558
        },
        "jsonb w/ 2 queries": {
          "user": 0.47,
          "system": 0.0,
          "total": 0.47,
          "real": 0.827564
        },
        "hstore w/ 2 queries": {
          "user": 0.39,
          "system": 0.02,
          "total": 0.41,
          "real": 0.787863
        },
        "array w/ 2 queries": {
          "user": 0.39,
          "system": 0.01,
          "total": 0.4,
          "real": 0.717765
        }
      }
    },
    "random_keyword_search": [
      {
        "details": {
          "queries": 500,
          "keywords": 2
        },
        "benchmarks": {
        },
        "relation w/ 2 joins": {
          "user": 0.17,
          "system": 0.02,
          "total": 0.19,
          "real": 0.684838
        },
        "relation w/ 3 queries": {
          "user": 0.38,
          "system": 0.02,
          "total": 0.4,
          "real": 0.718846
        },
        "relation w/ 2 subq": {
          "user": 0.13,
          "system": 0.01,
          "total": 0.14,
          "real": 0.457492
        },
        "relation w/ 1 subq, 2 joins": {
          "user": 0.16,
          "system": 0.0,
          "total": 0.16,
          "real": 0.503837
        },
        "jsonb w/ 1 subq": {
          "user": 0.2,
          "system": 0.01,
          "total": 0.21,
          "real": 1.637098
        },
        "array w/ 1 subq": {
          "user": 0.2,
          "system": 0.01,
          "total": 0.21,
          "real": 1.822541
        },
        "hstore w/ 1 subq": {
          "user": 0.2,
          "system": 0.0,
          "total": 0.2,
          "real": 1.634923
        },
        "jsonb w/ 2 queries": {
          "user": 0.14,
          "system": 0.0,
          "total": 0.14,
          "real": 0.255193
        },
        "hstore w/ 2 queries": {
          "user": 0.12,
          "system": 0.01,
          "total": 0.13,
          "real": 0.225804
        },
        "array w/ 2 queries": {
          "user": 0.13,
          "system": 0.01,
          "total": 0.14,
          "real": 0.254495
        }
      },
      {
        "details": {
          "queries": 500,
          "keywords": 5
        },
        "benchmarks": {
        },
        "relation w/ 2 joins": {
          "user": 0.16,
          "system": 0.01,
          "total": 0.17,
          "real": 0.866387
        },
        "relation w/ 3 queries": {
          "user": 0.26,
          "system": 0.0,
          "total": 0.26,
          "real": 0.577715
        },
        "relation w/ 2 subq": {
          "user": 0.13,
          "system": 0.0,
          "total": 0.13,
          "real": 0.512876
        },
        "relation w/ 1 subq, 2 joins": {
          "user": 0.19,
          "system": 0.01,
          "total": 0.2,
          "real": 1.003842
        },
        "jsonb w/ 1 subq": {
          "user": 0.19,
          "system": 0.01,
          "total": 0.2,
          "real": 2.400682
        },
        "array w/ 1 subq": {
          "user": 0.21,
          "system": 0.01,
          "total": 0.22,
          "real": 2.280781
        },
        "hstore w/ 1 subq": {
          "user": 0.19,
          "system": 0.01,
          "total": 0.2,
          "real": 2.551576
        },
        "jsonb w/ 2 queries": {
          "user": 0.14,
          "system": 0.01,
          "total": 0.15,
          "real": 0.264547
        },
        "hstore w/ 2 queries": {
          "user": 0.16,
          "system": 0.0,
          "total": 0.16,
          "real": 0.278741
        },
        "array w/ 2 queries": {
          "user": 0.14,
          "system": 0.0,
          "total": 0.14,
          "real": 0.257063
        }
      },
      {
        "details": {
          "queries": 500,
          "keywords": 10
        },
        "benchmarks": {
        },
        "relation w/ 2 joins": {
          "user": 0.23,
          "system": 0.01,
          "total": 0.24,
          "real": 3.138677
        },
        "relation w/ 3 queries": {
          "user": 0.34,
          "system": 0.02,
          "total": 0.36,
          "real": 0.849136
        },
        "relation w/ 2 subq": {
          "user": 0.19,
          "system": 0.03,
          "total": 0.22,
          "real": 2.138599
        },
        "relation w/ 1 subq, 2 joins": {
          "user": 0.25,
          "system": 0.0,
          "total": 0.25,
          "real": 2.605662
        },
        "jsonb w/ 1 subq": {
          "user": 0.22,
          "system": 0.01,
          "total": 0.23,
          "real": 3.441749
        },
        "array w/ 1 subq": {
          "user": 0.2,
          "system": 0.03,
          "total": 0.23,
          "real": 3.655168
        },
        "hstore w/ 1 subq": {
          "user": 0.21,
          "system": 0.01,
          "total": 0.22,
          "real": 3.578739
        },
        "jsonb w/ 2 queries": {
          "user": 0.19,
          "system": 0.01,
          "total": 0.2,
          "real": 0.353569
        },
        "hstore w/ 2 queries": {
          "user": 0.18,
          "system": 0.0,
          "total": 0.18,
          "real": 0.325309
        },
        "array w/ 2 queries": {
          "user": 0.27,
          "system": 0.01,
          "total": 0.28,
          "real": 0.512515
        }
      },
      {
        "details": {
          "queries": 500,
          "keywords": 1
        },
        "benchmarks": {
        },
        "relation w/ 2 joins": {
          "user": 0.4,
          "system": 0.0,
          "total": 0.4,
          "real": 0.823914
        },
        "relation w/ 3 queries": {
          "user": 1.33,
          "system": 0.02,
          "total": 1.35,
          "real": 1.915412
        },
        "relation w/ 2 subq": {
          "user": 0.48,
          "system": 0.01,
          "total": 0.49,
          "real": 1.028104
        },
        "relation w/ 1 subq, 2 joins": {
          "user": 0.54,
          "system": 0.0,
          "total": 0.54,
          "real": 1.137333
        },
        "jsonb w/ 1 subq": {
          "user": 0.61,
          "system": 0.02,
          "total": 0.63,
          "real": 1.96521
        },
        "array w/ 1 subq": {
          "user": 0.68,
          "system": 0.02,
          "total": 0.7,
          "real": 2.433348
        },
        "hstore w/ 1 subq": {
          "user": 0.52,
          "system": 0.01,
          "total": 0.53,
          "real": 1.705232
        },
        "jsonb w/ 2 queries": {
          "user": 0.14,
          "system": 0.01,
          "total": 0.15,
          "real": 0.230709
        },
        "hstore w/ 2 queries": {
          "user": 0.13,
          "system": 0.01,
          "total": 0.14,
          "real": 0.223473
        },
        "array w/ 2 queries": {
          "user": 0.11,
          "system": 0.0,
          "total": 0.11,
          "real": 0.188354
        }
      },
      {
        "details": {
          "queries": 500,
          "keywords": 15
        },
        "benchmarks": {
        },
        "relation w/ 2 joins": {
          "user": 0.24,
          "system": 0.01,
          "total": 0.25,
          "real": 2.493665
        },
        "relation w/ 3 queries": {
          "user": 0.37,
          "system": 0.01,
          "total": 0.38,
          "real": 0.887588
        },
        "relation w/ 2 subq": {
          "user": 0.23,
          "system": 0.01,
          "total": 0.24,
          "real": 2.280696
        },
        "relation w/ 1 subq, 2 joins": {
          "user": 0.28,
          "system": 0.0,
          "total": 0.28,
          "real": 2.534614
        },
        "jsonb w/ 1 subq": {
          "user": 0.24,
          "system": 0.01,
          "total": 0.25,
          "real": 3.915515
        },
        "array w/ 1 subq": {
          "user": 0.22,
          "system": 0.01,
          "total": 0.23,
          "real": 4.136068
        },
        "hstore w/ 1 subq": {
          "user": 0.22,
          "system": 0.02,
          "total": 0.24,
          "real": 4.152514
        },
        "jsonb w/ 2 queries": {
          "user": 0.35,
          "system": 0.0,
          "total": 0.35,
          "real": 0.631601
        },
        "hstore w/ 2 queries": {
          "user": 0.22,
          "system": 0.0,
          "total": 0.22,
          "real": 0.398178
        },
        "array w/ 2 queries": {
          "user": 0.34,
          "system": 0.01,
          "total": 0.35,
          "real": 0.633292
        }
      }
    ]
  }
};

export default applicationData;