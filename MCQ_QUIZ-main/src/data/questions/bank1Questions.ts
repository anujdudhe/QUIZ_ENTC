export const bank1Questions = [
  {
    id: 1,
    chapter: "BANK 1",
    question: "What is a key feature of RISC (Reduced Instruction Set Computing) used in modern microcontrollers?",
    options: [
      "Large number of complex instructions",
      "Simple, small number of instructions optimized for speed",
      "Only 4-bit operation",
      "High power consumption"
    ],
    answerIndex: 1
  },
  {
    id: 2,
    chapter: "BANK 1",
    question: "What is the role of the Control Unit in a microcomputer?",
    options: [
      "Store data permanently",
      "Perform calculations",
      "Coordinate and control all operations",
      "Manage external power"
    ],
    answerIndex: 2
  },
  {
    id: 3,
    chapter: "BANK 1",
    question: "Which of the following statements is TRUE about system buses?",
    options: [
      "They connect only the CPU to the keyboard",
      "They include the data, address, and control buses",
      "They are used only for graphics",
      "They do not affect system performance"
    ],
    answerIndex: 1
  },
  {
    id: 4,
    chapter: "BANK 1",
    question: "Embedded systems are mostly built for:",
    options: [
      "High-performance graphics",
      "General-purpose multitasking",
      "Dedicated control or monitoring",
      "Gaming applications"
    ],
    answerIndex: 2
  },
  {
    id: 5,
    chapter: "BANK 1",
    question: "In embedded systems, what is meant by “resource-constrained”?",
    options: [
      "Limited power, memory, and processing capability",
      "Unlimited memory usage",
      "Excessive power consumption",
      "High-end graphics support"
    ],
    answerIndex: 0
  },
  {
    id: 6,
    chapter: "BANK 1",
    question: "What is the function of an Actuator in embedded system hardware?",
    options: [
      "Convert digital signals into physical action",
      "Store energy",
      "Decode program instructions",
      "Generate clock signals"
    ],
    answerIndex: 0
  },
  {
    id: 7,
    chapter: "BANK 1",
    question: "What makes embedded systems ideal for real-time applications?",
    options: [
      "General-purpose architecture",
      "Predictable and deterministic behavior",
      "Slow response time",
      "Non-dedicated software"
    ],
    answerIndex: 1
  },
  {
    id: 8,
    chapter: "BANK 1",
    question: "Which function runs once at startup in Arduino?",
    options: [
      "begin()",
      "loop()",
      "setup()",
      "start()"
    ],
    answerIndex: 2
  },
  {
    id: 9,
    chapter: "BANK 1",
    question: "Embedded C is different from standard C because:",
    options: [
      "It is object-oriented",
      "It includes hardware-specific extensions",
      "It cannot use pointers",
      "It only runs on desktops"
    ],
    answerIndex: 1
  },
  {
    id: 10,
    chapter: "BANK 1",
    question: "The built-in LED on Arduino Uno is connected to pin:",
    options: ["1", "5", "10", "13"],
    answerIndex: 3
  },
  {
    id: 11,
    chapter: "BANK 1",
    question: "Why is selecting the correct COM port important?",
    options: [
      "It gives more memory",
      "The IDE uses it to upload sketches to the board",
      "It improves code readability",
      "It enables sensors"
    ],
    answerIndex: 1
  },
  {
    id: 12,
    chapter: "BANK 1",
    question: "Turn ON LED on digital pin:",
    options: [
      "digitalRead(7, HIGH);",
      "digitalWrite(7, HIGH);",
      "setPin(7);",
      "ledOn(7);"
    ],
    answerIndex: 1
  },
  {
    id: 13,
    chapter: "BANK 1",
    question: "What happens if delay(1000) is changed to delay(200) in the Blink sketch?",
    options: [
      "LED blinks slower",
      "LED blinks faster",
      "LED stops blinking",
      "No change"
    ],
    answerIndex: 1
  },
  {
    id: 14,
    chapter: "BANK 1",
    question: "If the LED is blinking unevenly, the most likely issue is:",
    options: [
      "Wrong board selected",
      "Incorrect delay values",
      "Bad USB driver",
      "Low RAM"
    ],
    answerIndex: 1
  },
  {
    id: 15,
    chapter: "BANK 1",
    question: "What happens if delay(1000) is changed to delay(200)?",
    options: [
      "LED blinks faster",
      "LED blinks slower",
      "LED stops blinking",
      "No change"
    ],
    answerIndex: 0
  },
  {
    id: 16,
    chapter: "BANK 1",
    question: "A relay is mainly used to control:",
    options: [
      "Only LEDs",
      "Low-power circuits",
      "High-power devices using low-power signals",
      "Serial communication"
    ],
    answerIndex: 2
  },
  {
    id: 17,
    chapter: "BANK 1",
    question: "How many segments are present in a standard seven-segment display excluding the decimal point?",
    options: ["5", "6", "7", "8"],
    answerIndex: 2
  },
  {
    id: 18,
    chapter: "BANK 1",
    question: "Which Arduino function sends data/characters to an LCD?",
    options: [
      "lcd.write()",
      "lcd.send()",
      "lcd.print()",
      "lcd.char()"
    ],
    answerIndex: 2
  },
  {
    id: 19,
    chapter: "BANK 1",
    question: "Why is a current-limiting resistor used with an LED?",
    options: [
      "To increase brightness",
      "To protect the LED from high current",
      "To generate heat",
      "To reduce voltage for Arduino"
    ],
    answerIndex: 1
  },
  {
    id: 20,
    chapter: "BANK 1",
    question: "Why should a relay be driven through a transistor/module instead of directly from Arduino?",
    options: [
      "Arduino pins supply high current",
      "Relays work at low current",
      "Arduino cannot supply enough current to energize the relay coil",
      "Relay does not need isolation"
    ],
    answerIndex: 2
  },
  {
    id: 21,
    chapter: "BANK 1",
    question: "In a common-anode display, segments glow when:",
    options: [
      "Segment pins are LOW",
      "Segment pins are HIGH",
      "All pins are disconnected",
      "Arduino resets"
    ],
    answerIndex: 0
  },
  {
    id: 22,
    chapter: "BANK 1",
    question: "Why must we specify RS, E, D4–D7 pins while creating the LCD object?",
    options: [
      "To identify the LCD brand",
      "So Arduino knows which pins control the LCD",
      "To set brightness",
      "To reset display"
    ],
    answerIndex: 1
  },
  {
    id: 23,
    chapter: "BANK 1",
    question: "If digitalRead() randomly shows HIGH and LOW without pressing the switch, the cause is:",
    options: [
      "Short circuit",
      "Pull-up/pull-down not used",
      "Wrong board selection",
      "Power supply issue"
    ],
    answerIndex: 1
  },
  {
    id: 24,
    chapter: "BANK 1",
    question: "What is the output of the given LED blinking code with delay(500)?",
    options: [
      "LED stays OFF",
      "LED stays ON",
      "LED blinks every 1 second",
      "LED blinks every 0.5 second"
    ],
    answerIndex: 2
  },
  {
    id: 25,
    chapter: "BANK 1",
    question: "If relay module is active LOW and digitalWrite(8, LOW) is executed, what happens?",
    options: [
      "Relay turns OFF",
      "Relay turns ON",
      "Board resets",
      "Relay gets damaged"
    ],
    answerIndex: 1
  },
  {
    id: 26,
    chapter: "BANK 1",
    question: "What digit is displayed when all segments except 'g' are ON?",
    options: ["8", "0", "1", "6"],
    answerIndex: 1
  },
  {
    id: 27,
    chapter: "BANK 1",
    question: "What will this LCD code display?",
    options: [
      "Only Hello",
      "Only Arduino",
      "Hello on line 1 and Arduino on line 2",
      "Garbage characters"
    ],
    answerIndex: 2
  },
  {
    id: 28,
    chapter: "BANK 1",
    question: "Which best defines the Internet of Things (IoT)?",
    options: [
      "A network of computers connected to the internet",
      "A system where physical devices are connected to the internet to collect and exchange data",
      "A virtual computer network",
      "A software development method"
    ],
    answerIndex: 1
  },
  {
    id: 29,
    chapter: "BANK 1",
    question: "Which layer of IoT architecture is responsible for sensing the environment?",
    options: [
      "Application layer",
      "Network layer",
      "Perception layer",
      "Middleware layer"
    ],
    answerIndex: 2
  },
  {
    id: 30,
    chapter: "BANK 1",
    question: "Why are embedded systems suitable for IoT?",
    options: [
      "They consume high power",
      "They are large and require cooling",
      "They are small, efficient, and task-specific",
      "They require complex operating systems"
    ],
    answerIndex: 2
  },
  {
    id: 31,
    chapter: "BANK 1",
    question: "What makes IoT devices smart?",
    options: [
      "Ability to install any software",
      "Ability to sense, compute, and communicate data",
      "Ability to operate without electrical power",
      "Ability to be physically large"
    ],
    answerIndex: 1
  },
  {
    id: 32,
    chapter: "BANK 1",
    question: "What is the main function of the network layer in IoT?",
    options: [
      "Data sensing",
      "Data storage",
      "Data transmission between devices and servers",
      "Displaying data to the user"
    ],
    answerIndex: 2
  },
  {
    id: 33,
    chapter: "BANK 1",
    question: "Which IoT component is used to track temperature of food during transport?",
    options: [
      "Smart displays",
      "Temperature sensors connected to cloud storage",
      "Social media apps",
      "Barcode scanners"
    ],
    answerIndex: 1
  },
  {
    id: 34,
    chapter: "BANK 1",
    question: "Which IoT technology is suitable for turning off lights when no one is in the room?",
    options: [
      "Sound system",
      "Motion sensor + automation system",
      "Smart TV",
      "Keyboard input"
    ],
    answerIndex: 1
  },
  {
    id: 35,
    chapter: "BANK 1",
    question: "Machines sending alerts before failure is an example of:",
    options: [
      "Batch processing",
      "Remote configuration",
      "Predictive maintenance",
      "Manual control"
    ],
    answerIndex: 2
  }

];
