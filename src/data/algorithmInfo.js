export const ALGORITHM_INFO = {
  1: {
    name: 'Stack',
    description: 'A linear data structure enforcing Last-In, First-Out (LIFO) order. It acts as the foundational memory architecture for modern computation.',
    inDepth: "A stack is a fundamental abstract data type that serves as a collection of elements, with two principal operations: 'push', which adds an element to the collection, and 'pop', which removes the most recently added element that was not yet removed. The order in which elements come off a stack gives rise to its alternative name, LIFO (Last-In, First-Out). \n\nIn computer architecture, stacks are implemented as contiguous blocks of memory with a pointer tracking the 'top' of the stack. Because operations are strictly limited to one end of the structure, stacks guarantee O(1) time complexity for both insertions and deletions. This deterministic performance makes them indispensable for tracking state in scenarios where the most recent execution context must be resolved before proceeding, such as evaluating algebraic expressions or navigating deeply nested directories.",
    keyPoints: [
      { title: 'LIFO Architecture', text: 'Data flows in a singular vertical axis. The last element pushed onto the stack is mathematically guaranteed to be the first one popped off.' },
      { title: 'Memory Contiguity', text: 'Typically implemented using dynamic arrays under the hood, ensuring high cache-hit ratios and spatial locality in CPU architecture.' },
      { title: 'Deterministic O(1)', text: 'Push and pop operations require no traversal or shifting of adjacent elements, resulting in constant-time execution regardless of stack size.' }
    ],
    timeComplexity: 'O(1) Insertion/Deletion',
    spaceComplexity: 'O(n) Total Memory',
    useCases: 'Stacks form the backbone of execution threads (the "Call Stack"). They are used in syntax parsing, depth-first traversal of graphs, reversing data sequences, and managing undo/redo states in software applications.'
  },
  2: {
    name: 'Queue',
    description: 'A linear collection enforcing First-In, First-Out (FIFO) semantics, critical for asynchronous processing and resource scheduling.',
    inDepth: "A queue is an abstract data type that maintains the order of elements based on the sequence of their arrival. Operating under the FIFO (First-In, First-Out) principle, items are added at the 'rear' (enqueue) and removed from the 'front' (dequeue). \n\nUnlike stacks, queues require maintaining two pointers: one for the head and one for the tail. In naive array implementations, dequeuing an element requires shifting all remaining elements forward, resulting in O(n) complexity. To achieve O(1) efficiency, modern queues are implemented using linked lists or circular buffers. Queues are the architectural foundation of asynchronous programming, handling everything from web server request buffering to CPU task scheduling, ensuring fairness by guaranteeing that the oldest request is always serviced first.",
    keyPoints: [
      { title: 'FIFO Semantics', text: 'Strict adherence to chronological order. The element with the longest wait time is exclusively granted the next processing slot.' },
      { title: 'Dual-Pointer Mechanics', text: 'Requires distinct tracking of both the head (for extraction) and the tail (for insertion) to maintain constant-time operations.' },
      { title: 'Circular Buffering', text: 'Advanced array-based queues use modulo arithmetic to wrap the tail pointer around to the front, preventing memory fragmentation.' }
    ],
    timeComplexity: 'O(1) Enqueue/Dequeue',
    spaceComplexity: 'O(n) Queue Capacity',
    useCases: 'Essential for concurrent systems. Used in Breadth-First Search (BFS), thread pooling, IO buffering, handling asynchronous web requests, and message brokers like RabbitMQ or Kafka.'
  },
  3: {
    name: 'Linked List',
    description: 'A sequence of dynamically allocated nodes scattered across memory, connected via cryptographic-like structural pointers.',
    inDepth: "A linked list is a linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next. It is a data structure consisting of a collection of nodes which together represent a sequence. \n\nIn its most basic form, each node contains data and a reference (in other words, a link) to the next node in the sequence. This structure allows for efficient insertion or removal of elements from any position in the sequence during iteration. More complex variants add additional links, allowing efficient insertion or removal of nodes at arbitrary positions. A drawback of linked lists is that access time is linear (and difficult to pipeline). Faster access, such as random access, is not feasible. Arrays have better cache locality compared to linked lists.",
    keyPoints: [
      { title: 'Dynamic Allocation', text: 'Memory is allocated on the heap one node at a time. The structure can grow organically without requiring expensive array resizing operations.' },
      { title: 'Sequential Access', text: 'Unlike arrays, linked lists lack random access capability. Locating the nth element requires an O(n) traversal from the head node.' },
      { title: 'O(1) Structural Mutation', text: 'Once a node is located, inserting or deleting an adjacent node is an O(1) operation involving merely rewiring two pointer references.' }
    ],
    timeComplexity: 'O(n) Access/Search',
    spaceComplexity: 'O(n) + Pointer Overhead',
    useCases: 'Used extensively in memory management (free lists), implementing complex data structures like graphs (adjacency lists) and hash tables (chaining), and applications requiring constant-time insertions in the middle of a dataset.'
  },
  4: {
    name: 'Binary Search Tree',
    description: 'A node-based hierarchical structure that enforces a sorted property, reducing search space logarithmically.',
    inDepth: "A Binary Search Tree (BST) is a rooted binary tree data structure whose internal nodes each store a key greater than all the keys in the node's left subtree and less than those in its right subtree. A BST operates on the principle of binary search, continuously dividing the search space in half. \n\nWhen perfectly balanced, a BST allows for operations (lookup, insertion, deletion) in O(log n) time. However, if keys are inserted in a sorted or nearly sorted order, the tree can degenerate into a linked list, degrading performance to O(n). To prevent this, self-balancing variants like AVL trees and Red-Black trees automatically restructure themselves during insertions and deletions via 'rotations', guaranteeing logarithmic bounds.",
    keyPoints: [
      { title: 'The BST Property', text: 'Every node strictly partitions its descendants: all left children are smaller, and all right children are larger than the parent node.' },
      { title: 'Logarithmic Halving', text: 'Every comparison conceptually eliminates half of the remaining nodes, making search exponentially faster than linear traversal.' },
      { title: 'In-Order Traversal', text: 'Recursively visiting the left child, the parent, and then the right child naturally yields the elements in perfectly sorted order.' }
    ],
    timeComplexity: 'O(log n) Avg, O(n) Worst',
    spaceComplexity: 'O(n) Nodes',
    useCases: 'The backbone of database indices, dynamic sets, symbol tables in compilers, and autocomplete systems. Self-balancing trees power the internal implementations of Map and Set in many programming languages.'
  },
  5: {
    name: 'Graph',
    description: 'A non-linear mathematical structure modeling pairwise relations between objects, representing the ultimate abstraction of networks.',
    inDepth: "In computer science, a graph is an abstract data type that is meant to implement the undirected graph and directed graph concepts from mathematics. A graph data structure consists of a finite set of vertices (or nodes) together with a set of unordered pairs of these vertices for an undirected graph or a set of ordered pairs for a directed graph.\n\nGraphs are structurally diverse. They can be cyclic or acyclic, weighted or unweighted, dense or sparse. They are typically represented programmatically in one of two ways: an Adjacency Matrix (a 2D array offering O(1) edge lookup but O(V²) space) or an Adjacency List (an array of lists offering O(V + E) space, ideal for sparse networks). Graph theory underpins almost every complex routing and relationship problem in modern computing.",
    keyPoints: [
      { title: 'Vertices and Edges', text: 'The foundational vocabulary of graphs. Vertices represent entities (routers, users, cities) while edges represent the relationships or pathways between them.' },
      { title: 'Directed vs Undirected', text: 'Edges can be unidirectional (like a Twitter follow) or bidirectional (like a Facebook friendship), fundamentally altering traversal algorithms.' },
      { title: 'Traversal Paradigms', text: 'Graphs are explored via Depth-First Search (diving deep into paths) or Breadth-First Search (exploring neighbors first, guaranteeing shortest unweighted paths).' }
    ],
    timeComplexity: 'O(V + E) Traversal',
    spaceComplexity: 'O(V + E) for Adj List',
    useCases: 'Social network friend recommendations, GPS navigation algorithms (Dijkstra’s), network packet routing protocols, state machine modeling, and dependency resolution in package managers.'
  },
  6: {
    name: 'Dynamic Programming',
    description: 'An algorithmic paradigm that optimizes recursive problems by caching intermediate results, trading memory for exponential time savings.',
    inDepth: "Dynamic Programming (DP) is both a mathematical optimization method and a computer programming method. It is used to solve complex problems by breaking them down into simpler subproblems. If a problem can be solved optimally by breaking it into subproblems and then recursively finding the optimal solutions to the subproblems, then it is said to have optimal substructure.\n\nThere are two key attributes that a problem must have for DP to apply: optimal substructure and overlapping subproblems. If a subproblem is solved multiple times, DP caches the result (Memoization) or solves the problem from the bottom up (Tabulation). This transforms exponential-time O(2^n) recursive nightmares—like computing the Fibonacci sequence or the Knapsack problem—into highly efficient O(n) polynomial-time algorithms.",
    keyPoints: [
      { title: 'Memoization (Top-Down)', text: 'A recursive approach that intercepts function calls. If a state has been calculated previously, the cached result is returned instantly in O(1) time.' },
      { title: 'Tabulation (Bottom-Up)', text: 'An iterative approach that solves all smallest subproblems first, storing them in an array or table, and building up to the final solution.' },
      { title: 'Overlapping Subproblems', text: 'The defining characteristic where a naive recursive algorithm would repeatedly evaluate exactly the same sub-branches of the execution tree.' }
    ],
    timeComplexity: 'Polynomial (Problem Dependent)',
    spaceComplexity: 'O(n) to O(n²) for Tables',
    useCases: 'Bioinformatics (sequence alignment), economics, aerospace engineering, string matching algorithms (Levenshtein distance), and resource allocation optimization (the Knapsack problem).'
  },
  7: {
    name: 'Backtracking',
    description: 'A methodical algorithmic technique for solving constraint satisfaction problems by incrementally building candidates and abandoning invalid paths.',
    inDepth: "Backtracking is a general algorithm for finding all (or some) solutions to some computational problems, notably constraint satisfaction problems, that incrementally builds candidates to the solutions, and abandons a candidate ('backtracks') as soon as it determines that the candidate cannot possibly be completed to a valid solution.\n\nImagine navigating a massive maze. Backtracking dictates that you walk down a path until you hit a dead end. Instead of starting over, you retrace your steps exactly to the last fork in the road and try the alternate route. Programmatically, this relies heavily on the Call Stack. The algorithm makes a choice, recursively calls itself to explore the consequences, and if the choice leads to failure, the function returns, popping the state off the stack and physically 'undoing' the choice before trying the next one.",
    keyPoints: [
      { title: 'Constraint Satisfaction', text: 'The algorithm operates on strict rules. If an intermediate state violates a rule (e.g. two Queens threatening each other), the entire branch is pruned.' },
      { title: 'State Reversal', text: 'The hallmark of backtracking. After a recursive call returns, the algorithm must restore the environment (un-placing a piece) to ensure sibling branches are unpolluted.' },
      { title: 'Algorithmic Pruning', text: 'By identifying dead ends early, backtracking avoids evaluating millions of invalid permutations, drastically outperforming brute-force search.' }
    ],
    timeComplexity: 'Often O(n!) or O(c^n)',
    spaceComplexity: 'O(n) Call Stack Depth',
    useCases: 'Solving Sudoku, the N-Queens problem, finding Hamiltonian paths in graphs, generating permutations/combinations, and regex engine pattern matching.'
  },
  8: {
    name: 'Divide & Conquer',
    description: 'A recursively defined paradigm that shatters large datasets into atomic, solvable pieces before weaving them back together.',
    inDepth: "Divide and Conquer is an algorithm design paradigm based on multi-branched recursion. A divide-and-conquer algorithm works by recursively breaking down a problem into two or more sub-problems of the same or related type, until these become simple enough to be solved directly. The solutions to the sub-problems are then combined to give a solution to the original problem.\n\nThis technique is the theoretical basis for many of the most efficient algorithms in computer science. For example, Merge Sort divides an array until it reaches arrays of size 1 (which are inherently sorted), and then merges those sorted arrays back together in linear time. Because the problem space is halved at each step, these algorithms typically yield highly performant O(n log n) execution times.",
    keyPoints: [
      { title: 'The Divide Step', text: 'The mathematical partitioning of the data set into strictly smaller fragments, typically dividing the size by two in each recursive frame.' },
      { title: 'The Base Case', text: 'The atomic level where the problem is trivially solvable. In sorting, an array of zero or one element requires no logic to sort.' },
      { title: 'The Conquer Step', text: 'The complex orchestration of stitching the atomic solutions back together. In Merge Sort, this is the O(n) weaving of two sorted sub-arrays.' }
    ],
    timeComplexity: 'Typically O(n log n)',
    spaceComplexity: 'O(log n) to O(n)',
    useCases: 'Advanced sorting (Merge Sort, Quick Sort), Fast Fourier Transforms (FFT) in audio processing, Strassen’s matrix multiplication, and closest pair of points algorithms.'
  },
  9: {
    name: 'Greedy Algorithm',
    description: 'A heuristic problem-solving strategy that makes the locally optimal choice at each stage with the hope of finding a global optimum.',
    inDepth: "A greedy algorithm is any algorithm that follows the problem-solving heuristic of making the locally optimal choice at each stage. In many problems, a greedy strategy does not produce an optimal solution, but a greedy heuristic can yield locally optimal solutions that approximate a globally optimal solution in a reasonable amount of time.\n\nGreedy algorithms are defined by their myopia. They do not look ahead to see the future consequences of their actions; they simply ask, 'What is the absolute best move I can make right in this exact millisecond?' While this fails for complex dynamic systems (like the Knapsack problem), for systems with the 'Greedy Choice Property' (like Dijkstra's algorithm or Huffman coding), it produces mathematically perfect results with significantly less memory and overhead than Dynamic Programming.",
    keyPoints: [
      { title: 'Local Optimization', text: 'The algorithm evaluates only the immediate choices available to it, ignoring any long-term consequences or previously discarded paths.' },
      { title: 'Irrevocability', text: 'Once a greedy algorithm makes a decision, it never reconsiders it. There is no backtracking or memoization; it commits fully to its path.' },
      { title: 'Matroid Theory', text: 'The mathematical structure that dictates whether a greedy algorithm will successfully find a global optimum for a given problem.' }
    ],
    timeComplexity: 'Often O(n) or O(n log n)',
    spaceComplexity: 'O(1) Auxiliary Space',
    useCases: 'Data compression (Huffman Coding), minimum spanning trees (Kruskal’s and Prim’s algorithms), activity selection problems, and network routing optimizations.'
  },
  10: {
    name: 'Sorting',
    description: 'The computational process of arranging data into a meaningful, deterministic order, forming the prerequisite for efficient searching.',
    inDepth: "Sorting is any process of arranging items systematically, and has two common, yet distinct meanings: ordering (arranging items in a sequence ordered by some criterion) and categorizing (grouping items with similar properties). In computer science, sorting algorithms are highly fundamental, as their output is a necessary prerequisite for highly efficient algorithms like Binary Search.\n\nThere are dozens of sorting algorithms, each tailored to specific data constraints. Quadratic sorts like Bubble Sort and Insertion Sort compare adjacent elements, operating in O(n²) time—inefficient for large data, but highly cache-friendly for nearly sorted sets. Advanced sorts like Quick Sort and Merge Sort utilize Divide and Conquer to achieve O(n log n) bounds, representing the mathematical limit for comparison-based sorting.",
    keyPoints: [
      { title: 'Comparison vs Non-Comparison', text: 'Most algorithms sort by comparing elements (A > B). Non-comparison sorts like Radix Sort bypass this using hash-like bucketing for O(n) speeds under strict constraints.' },
      { title: 'Algorithmic Stability', text: 'A stable sort maintains the relative order of identical elements. If you sort a database by Last Name, and then by First Name, a stable sort preserves the Last Name grouping.' },
      { title: 'In-Place Operation', text: 'Algorithms like Quick Sort require minimal extra memory (O(log n)), whereas Merge Sort requires duplicating the entire array (O(n)), impacting system memory limits.' }
    ],
    timeComplexity: 'O(n²) to O(n log n)',
    spaceComplexity: 'O(1) to O(n)',
    useCases: 'Database indexing, computer graphics rendering (Z-ordering), data compression preprocessing, and anywhere that fast O(log n) searching is required.'
  },
  11: {
    name: 'Recursion',
    description: 'A structural programming paradigm where a function calls itself, leveraging the system call stack to resolve deeply nested, self-similar patterns.',
    inDepth: "In computer science, recursion is a method of solving a computational problem where the solution depends on solutions to smaller instances of the same problem. Recursion solves such recursive problems by using functions that call themselves from within their own code.\n\nThe power of recursion lies in its ability to express complex logic with elegant, minimalistic code. Every recursive function must have two properties: a 'Base Case' which immediately returns a value without recursing, and a 'Recursive Step' which moves the execution state closer to the base case. Without a base case, the function will call itself infinitely, resulting in a Stack Overflow. Under the hood, recursion relies on the OS allocating a new Memory Frame for every call, tracking the local variables until the base case collapses the stack.",
    keyPoints: [
      { title: 'The Base Case', text: 'The absolute termination condition. It prevents infinite loops by defining the simplest possible, indivisible version of the problem.' },
      { title: 'Call Stack Utilization', text: 'The OS implicitly manages state. Every recursive jump pushes a new context onto the stack, consuming O(depth) memory until resolution.' },
      { title: 'Tail-Call Optimization', text: 'A compiler feature where recursive calls made as the final action in a function are optimized into iterative loops, eliminating memory overhead.' }
    ],
    timeComplexity: 'Problem Dependent',
    spaceComplexity: 'O(Max Recursion Depth)',
    useCases: 'Navigating tree structures (DOM traversal, file systems), compiling source code (Abstract Syntax Trees), evaluating mathematical formulas, and implementing functional programming patterns.'
  }
}
