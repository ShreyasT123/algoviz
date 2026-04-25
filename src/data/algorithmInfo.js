export const ALGORITHM_INFO = {
  1: {
    name: 'Stack',
    description: 'A Last-In-First-Out (LIFO) data structure where elements are added and removed from the same end.',
    keyPoints: [
      'Elements follow LIFO principle',
      'Push adds element to top',
      'Pop removes from top',
      'Used in undo/redo, function calls'
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    useCases: 'Browser history, function call stack, expression evaluation'
  },
  2: {
    name: 'Queue',
    description: 'A First-In-First-Out (FIFO) data structure where elements are added at the end and removed from the front.',
    keyPoints: [
      'Elements follow FIFO principle',
      'Enqueue adds to back',
      'Dequeue removes from front',
      'Used in scheduling, BFS'
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    useCases: 'Print queue, CPU scheduling, breadth-first search'
  },
  3: {
    name: 'Linked List',
    description: 'A linear data structure where elements (nodes) are connected via pointers, allowing dynamic memory allocation.',
    keyPoints: [
      'Each node has data and pointer to next',
      'Flexible insertion/deletion',
      'No random access required',
      'Better than arrays for frequent inserts'
    ],
    timeComplexity: 'O(n) search, O(1) insert/delete',
    spaceComplexity: 'O(n)',
    useCases: 'Dynamic size collections, hash table chains, undo functionality'
  },
  4: {
    name: 'Tree',
    description: 'A hierarchical data structure with a root node and branches, following parent-child relationships.',
    keyPoints: [
      'Root has no parent',
      'Each node has one parent',
      'Leaf nodes have no children',
      'BST maintains sorted order'
    ],
    timeComplexity: 'O(log n) balanced, O(n) worst case',
    spaceComplexity: 'O(n)',
    useCases: 'File systems, DOM structure, database indexes, autocomplete'
  },
  5: {
    name: 'Graph',
    description: 'A non-linear data structure with nodes (vertices) connected by edges, allowing complex relationships.',
    keyPoints: [
      'Vertices and edges form connections',
      'Can be directed or undirected',
      'May contain cycles',
      'Foundation for networks and mappings'
    ],
    timeComplexity: 'O(V + E) for BFS/DFS',
    spaceComplexity: 'O(V + E)',
    useCases: 'Social networks, GPS navigation, web crawling, recommendation systems'
  },
  6: {
    name: 'Dynamic Programming',
    description: 'An optimization technique that solves problems by breaking them into subproblems and storing results.',
    keyPoints: [
      'Overlapping subproblems',
      'Optimal substructure property',
      'Memoization or tabulation approach',
      'Trades space for time'
    ],
    timeComplexity: 'Varies by problem, usually polynomial',
    spaceComplexity: 'O(n) or O(n²) for memoization',
    useCases: 'Fibonacci, coin change, longest common subsequence, knapsack'
  },
  7: {
    name: 'Backtracking',
    description: 'A recursive algorithm that explores all possible solutions and abandons paths that won\'t lead to valid answers.',
    keyPoints: [
      'Explores solution space systematically',
      'Prunes invalid branches early',
      'Builds solutions incrementally',
      'Requires backtracking on failure'
    ],
    timeComplexity: 'Exponential in worst case',
    spaceComplexity: 'O(n) for recursion stack',
    useCases: 'N-Queens, Sudoku solver, maze solving, permutations/combinations'
  },
  8: {
    name: 'Divide & Conquer',
    description: 'A strategy that divides a problem into independent subproblems, solves them, then combines the results.',
    keyPoints: [
      'Divide problem into subproblems',
      'Conquer by solving recursively',
      'Combine results of subproblems',
      'Often more efficient than naive approach'
    ],
    timeComplexity: 'Usually O(n log n) or better',
    spaceComplexity: 'O(log n) for recursion',
    useCases: 'Merge sort, quick sort, binary search, FFT'
  },
  9: {
    name: 'Greedy Algorithm',
    description: 'An algorithm that makes locally optimal choices at each step, hoping to find a global optimum.',
    keyPoints: [
      'Makes locally optimal choice at each step',
      'Never reconsiders previous choices',
      'Simpler and faster than other approaches',
      'Doesn\'t always guarantee optimal solution'
    ],
    timeComplexity: 'Usually O(n) or O(n log n)',
    spaceComplexity: 'O(1) or O(n)',
    useCases: 'Coin change, activity selection, Huffman coding, Dijkstra\'s algorithm'
  },
  10: {
    name: 'Sorting',
    description: 'Algorithms that arrange elements in a specific order (ascending/descending), fundamental for data processing.',
    keyPoints: [
      'Bubble sort: Simple but O(n²)',
      'Quick sort: Average O(n log n), divide & conquer',
      'Merge sort: Guaranteed O(n log n), stable',
      'Stability matters for multi-key sorting'
    ],
    timeComplexity: 'O(n²) to O(n log n) depending on algorithm',
    spaceComplexity: 'O(1) to O(n) depending on algorithm',
    useCases: 'Data processing, searching, ranking, aggregation'
  },
  11: {
    name: 'Recursion',
    description: 'A programming technique where a function calls itself, useful for solving problems with recursive structure.',
    keyPoints: [
      'Base case stops recursion',
      'Recursive case moves toward base',
      'Each call uses stack space',
      'Risk of stack overflow with deep recursion'
    ],
    timeComplexity: 'Depends on recursion depth and work per call',
    spaceComplexity: 'O(depth) for call stack',
    useCases: 'Tree traversal, factorial, Fibonacci, backtracking, DFS'
  }
}
