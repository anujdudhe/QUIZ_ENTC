export const bank4Questions = [
 
  {
    id: 1,
    chapter: "BANK 4",
    question: "Which of the following is one of the primary elements of a microcomputer?",
    options: ["ALU Unit", "Control", "CPU", "Registers"],
    answerIndex: 2
  },
  {
    id: 2,
    chapter: "BANK 4",
    question: "What are the three main types of buses in a microcomputer system?",
    options: [
      "Power bus, signal bus, data bus",
      "Address bus, data bus, control bus",
      "Input bus, output bus, memory bus",
      "Serial bus, parallel bus, hybrid bus"
    ],
    answerIndex: 1
  },
  {
    id: 3,
    chapter: "BANK 4",
    question: "What is the key difference between a microprocessor and a microcontroller?",
    options: [
      "A microprocessor requires external memory and peripherals, while a microcontroller integrates them on-chip",
      "A microprocessor is used only in computers, while a microcontroller is for servers",
      "A microprocessor has more pins than a microcontroller",
      "A microprocessor cannot execute code"
    ],
    answerIndex: 0
  },
  {
    id: 4,
    chapter: "BANK 4",
    question: "Why is the 8051 family of microcontrollers widely used?",
    options: [
      "They offer on-chip ROM, RAM, timers, and I/O ports",
      "They require high power and external cooling",
      "They are limited to 4-bit processing",
      "They lack serial communication"
    ],
    answerIndex: 0
  },
  {
    id: 5,
    chapter: "BANK 4",
    question: "Which 8051 version has 4KB ROM, 128B RAM and four I/O ports?",
    options: ["89C1051", "89C2051", "89C4051", "89C51"],
    answerIndex: 3
  },
  {
    id: 6,
    chapter: "BANK 4",
    question: "For a keypad lock system requiring 2KB memory and a 20-pin package, which 8051 version is suitable?",
    options: ["89C51", "89C1051", "89C2051", "89C4051"],
    answerIndex: 2
  },
  {
    id: 7,
    chapter: "BANK 4",
    question: "Which is NOT a basic component of embedded system hardware?",
    options: [
      "Microcontroller/Microprocessor",
      "Sensors and Actuators",
      "Cooling Fan and Heat Sink",
      "Power Supply"
    ],
    answerIndex: 2
  },
  {
    id: 8,
    chapter: "BANK 4",
    question: "The ATmega328 microcontroller belongs to which family?",
    options: ["8051", "PIC", "AVR", "ARM Cortex"],
    answerIndex: 2
  },
  {
    id: 9,
    chapter: "BANK 4",
    question: "Why are embedded systems more power-efficient?",
    options: [
      "They use high-performance GPUs",
      "They are designed for specific tasks with optimized hardware",
      "They always run on AC power",
      "They have larger RAM"
    ],
    answerIndex: 1
  },
  {
    id: 10,
    chapter: "BANK 4",
    question: "Which architectural difference is most prominent among 89C51, PIC, AVR, and ARM?",
    options: [
      "89C51 and PIC use CISC, AVR and ARM use RISC",
      "89C51 uses CISC, PIC/AVR/ARM use RISC",
      "All use CISC",
      "Only ARM is 32-bit"
    ],
    answerIndex: 1
  },
  {
    id: 11,
    chapter: "BANK 4",
    question: "RESET (PC6) pin in ATmega328 is active at which level?",
    options: ["Active High", "Active Low", "Both", "Tri-state"],
    answerIndex: 1
  },
  {
    id: 12,
    chapter: "BANK 4",
    question: "Which microcontroller suits low-cost battery products with existing 8051 code?",
    options: ["ARM Cortex-M4", "PIC18F", "89C51/89C52", "ATmega328P"],
    answerIndex: 2
  },
  {
    id: 13,
    chapter: "BANK 4",
    question: "Which microcontroller is best for high-performance 32-bit industrial systems?",
    options: ["8051", "8-bit PIC", "8-bit AVR", "ARM Cortex-M/A"],
    answerIndex: 3
  },
  {
    id: 14,
    chapter: "BANK 4",
    question: "Which ATmega328 pin is used for SPI MOSI?",
    options: ["PB0", "PB3", "PD5", "PC0"],
    answerIndex: 1
  },
  {
    id: 15,
    chapter: "BANK 4",
    question: "Which two functions are mandatory in an Arduino sketch?",
    options: [
      "loop() and serial.begin()",
      "setup() and loop()",
      "start() and repeat()",
      "begin() and end()"
    ],
    answerIndex: 1
  },
  {
    id: 16,
    chapter: "BANK 4",
    question: "Built-in LED on Arduino UNO R3 is connected to which pin?",
    options: ["Digital Pin 0", "Digital Pin 13", "Analog Pin A0", "Digital Pin 9"],
    answerIndex: 1
  },
  {
    id: 17,
    chapter: "BANK 4",
    question: "Why does Arduino UNO have two 5V pins?",
    options: [
      "One regulated and one unregulated",
      "One input and one output",
      "Both are identical for convenience",
      "One for digital and one for analog"
    ],
    answerIndex: 2
  },
  {
    id: 18,
    chapter: "BANK 4",
    question: "Difference between HIGH and LOW in digitalWrite()?",
    options: [
      "HIGH=0V, LOW=5V",
      "HIGH=5V, LOW=0V",
      "Only mathematical difference",
      "No difference"
    ],
    answerIndex: 1
  },
  {
    id: 19,
    chapter: "BANK 4",
    question: "What does const mean in 'const int ledPin = 13;'?",
    options: [
      "Variable can change in setup()",
      "Cannot be modified during execution",
      "Automatically global",
      "Stored in EEPROM"
    ],
    answerIndex: 1
  },
  {
    id: 20,
    chapter: "BANK 4",
    question: "What happens if pinMode(13, OUTPUT) is omitted?",
    options: [
      "LED blinks normally",
      "LED always ON",
      "LED OFF or unpredictable",
      "Compilation error"
    ],
    answerIndex: 2
  },
  {
    id: 21,
    chapter: "BANK 4",
    question: "To blink LED at 2 Hz, which delay is required?",
    options: ["delay(250)", "delay(500)", "delay(1000)", "delay(125)"],
    answerIndex: 0
  },
  {
    id: 22,
    chapter: "BANK 4",
    question: "Which sketch correctly blinks LED on pin 10 with 500ms ON/OFF?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answerIndex: 1
  },
  {
    id: 23,
    chapter: "BANK 4",
    question: "How many pins are connected for a 4x4 keypad?",
    options: ["4", "4", "8", "16"],
    answerIndex: 2
  },
  {
    id: 24,
    chapter: "BANK 4",
    question: "Why is no resistor needed for built-in LED on pin 13?",
    options: [
      "Resistor already present",
      "Unlimited current",
      "Works on 3.3V",
      "Special LED"
    ],
    answerIndex: 0
  },
  {
    id: 25,
    chapter: "BANK 4",
    question: "How many data pins are required in 4-bit LCD mode?",
    options: ["8", "4", "6", "2"],
    answerIndex: 1
  },
  {
    id: 26,
    chapter: "BANK 4",
    question: "Best way to detect pull-up switch press?",
    options: [
      "INPUT detect HIGH",
      "INPUT_PULLUP detect LOW",
      "OUTPUT HIGH",
      "External pull-down"
    ],
    answerIndex: 1
  },
  {
    id: 27,
    chapter: "BANK 4",
    question: "Mandatory requirement to safely control AC bulb with relay?",
    options: [
      "Direct 5V from Arduino",
      "Only Arduino power",
      "AC isolation from low voltage",
      "Connect GND to neutral"
    ],
    answerIndex: 2
  },
  {
    id: 28,
    chapter: "BANK 4",
    question: "Steps required for one full rotation of 28BYJ-48 stepper motor?",
    options: ["64", "512", "2048", "4096"],
    answerIndex: 2
  },
  {
    id: 29,
    chapter: "BANK 4",
    question: "Which is NOT a basic IoT feature?",
    options: [
      "Connectivity",
      "Intelligence",
      "Dynamic nature",
      "High processing power in every device"
    ],
    answerIndex: 3
  },
  {
    id: 30,
    chapter: "BANK 4",
    question: "Why is NodeMCU better than Arduino UNO for IoT?",
    options: [
      "More digital pins",
      "Built-in WiFi & high speed",
      "3.3V operation",
      "More flash"
    ],
    answerIndex: 1
  },
  {
    id: 31,
    chapter: "BANK 4",
    question: "ThingSpeak stores sensor data in:",
    options: ["Channel", "Field", "Widget", "Device"],
    answerIndex: 0
  },
  {
    id: 32,
    chapter: "BANK 4",
    question: "Which platform is easiest for mobile-based IoT control?",
    options: ["ThingSpeak", "Blynk", "ThingWorx", "Local MQTT"],
    answerIndex: 1
  },
  {
    id: 33,
    chapter: "BANK 4",
    question: "Why does Blynk project stop working on mobile data?",
    options: [
      "No internet",
      "Wrong token",
      "Using local server",
      "WiFi changed"
    ],
    answerIndex: 2
  },
  {
    id: 34,
    chapter: "BANK 4",
    question: "To turn ON relay via NodeMCU GPIO2 (D4), which command is used?",
    options: [
      "digitalWire(2, HIGH)",
      "digitalWrite(2, LOW)",
      "Both same",
      "analogWrite(2,255)"
    ],
    answerIndex: 1
  },
  {
    id: 35,
    chapter: "BANK 4",
    question: "Easiest way to control room light from anywhere?",
    options: [
      "Custom web server",
      "Blynk app + virtual pin",
      "ThingSpeak monitoring",
      "LAN cable"
    ],
    answerIndex: 1
  }

];
