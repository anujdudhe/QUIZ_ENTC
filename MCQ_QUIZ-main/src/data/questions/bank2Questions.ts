export const bank2Questions = [
 
  {
    id: 1,
    chapter: "BANK 2",
    question: "A microcomputer is also commonly known as a:",
    options: [
      "Mainframe computer",
      "Minicomputer",
      "Supercomputer",
      "Personal Computer (PC)"
    ],
    answerIndex: 3
  },
  {
    id: 2,
    chapter: "BANK 2",
    question: "“Booting” a microcomputer means:",
    options: [
      "Restarting the system",
      "Deleting files",
      "Starting up and loading the operating system",
      "Installing new software"
    ],
    answerIndex: 2
  },
  {
    id: 3,
    chapter: "BANK 2",
    question: "In which application would a microcontroller be most appropriate?",
    options: [
      "Desktop computer",
      "Supercomputer",
      "Washing machine control system",
      "Game console GPU"
    ],
    answerIndex: 2
  },
  {
    id: 4,
    chapter: "BANK 2",
    question: "Which programming language is most commonly used in embedded systems?",
    options: [
      "JavaScript",
      "Python",
      "C",
      "SQL"
    ],
    answerIndex: 2
  },
  {
    id: 5,
    chapter: "BANK 2",
    question: "Which component converts physical signals into electrical signals?",
    options: [
      "Actuator",
      "Sensor",
      "DAC",
      "Memory"
    ],
    answerIndex: 1
  },
  {
    id: 6,
    chapter: "BANK 2",
    question: "Embedded systems are widely used for safety-critical operations in:",
    options: [
      "Gaming",
      "Aerospace and medical devices",
      "Web applications",
      "Word processing"
    ],
    answerIndex: 1
  },
  {
    id: 7,
    chapter: "BANK 2",
    question: "What is a key difference between embedded systems and general-purpose computers?",
    options: [
      "Embedded systems cannot use memory",
      "Embedded systems are smaller and task-specific",
      "General-purpose computers are always portable",
      "Embedded systems are slower than PCs"
    ],
    answerIndex: 1
  },
  {
    id: 8,
    chapter: "BANK 2",
    question: "What is Arduino?",
    options: [
      "A type of operating system",
      "A microprocessor chip",
      "An open-source electronics prototyping platform",
      "A software development IDE only"
    ],
    answerIndex: 2
  },
  {
    id: 9,
    chapter: "BANK 2",
    question: "The USB port in Arduino Uno is mainly used for:",
    options: [
      "Power supply only",
      "Uploading code and serial communication",
      "Displaying output",
      "Internet connectivity"
    ],
    answerIndex: 1
  },
  {
    id: 10,
    chapter: "BANK 2",
    question: "Which component provides voltage regulation on Arduino UNO R3?",
    options: [
      "ATmega328P",
      "16 MHz Crystal Oscillator",
      "5V and 3.3V Voltage Regulators",
      "ATmega16U2"
    ],
    answerIndex: 2
  },
  {
    id: 11,
    chapter: "BANK 2",
    question: "What is the function of the RESET pin header?",
    options: [
      "Serial communication",
      "Manual board reset",
      "Analog input",
      "Power supply"
    ],
    answerIndex: 1
  },
  {
    id: 12,
    chapter: "BANK 2",
    question: "What is the code to turn OFF LED on a digital pin?",
    options: [
      "digitalRead(7, LOW);",
      "digitalWrite(7, LOW);",
      "resetPin(7);",
      "ledOff(7);"
    ],
    answerIndex: 1
  },
  {
    id: 13,
    chapter: "BANK 2",
    question: "Which is the most memory-efficient declaration for a constant LED pin number?",
    options: [
      "int LED_PIN = 13",
      "long LED_PIN = 13",
      "const LED_PIN = 13",
      "char LED_PIN = 13"
    ],
    answerIndex: 2
  },
  {
    id: 14,
    chapter: "BANK 2",
    question: "What value should replace /* MISSING VALUE */ in pinMode(LED_BUILTIN, ___)?",
    options: [
      "INPUT",
      "HIGH",
      "OUTPUT",
      "13"
    ],
    answerIndex: 2
  },
  {
    id: 15,
    chapter: "BANK 2",
    question: "Which pin configuration avoids using an external resistor for a push button?",
    options: [
      "pinMode(2, OUTPUT);",
      "pinMode(2, INPUT_PULLUP);",
      "pinMode(2, INPUT);",
      "digitalWrite(2, HIGH);"
    ],
    answerIndex: 1
  },
  {
    id: 16,
    chapter: "BANK 2",
    question: "A relay module is normally triggered by:",
    options: [
      "Analog voltage",
      "Digital output pin",
      "PWM only",
      "Wi-Fi"
    ],
    answerIndex: 1
  },
  {
    id: 17,
    chapter: "BANK 2",
    question: "How many segments are present in a standard seven-segment display excluding the decimal point?",
    options: ["5", "6", "7", "8"],
    answerIndex: 2
  },
  {
    id: 18,
    chapter: "BANK 2",
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
    chapter: "BANK 2",
    question: "If a relay is OFF and the load must remain disconnected, which terminal should be used?",
    options: [
      "NC",
      "COM only",
      "NO",
      "Both NC and NO"
    ],
    answerIndex: 2
  },
  {
    id: 20,
    chapter: "BANK 2",
    question: "Why should a relay be driven through a transistor/module?",
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
    chapter: "BANK 2",
    question: "In a common-cathode display, segments glow when:",
    options: [
      "Segment pins are LOW",
      "Segment pins are HIGH",
      "All pins are disconnected",
      "Arduino resets"
    ],
    answerIndex: 1
  },
  {
    id: 22,
    chapter: "BANK 2",
    question: "Why must RS, E, D4–D7 pins be specified while creating an LCD object?",
    options: [
      "To identify the LCD brand",
      "Arduino knows which pins control the LCD",
      "To set brightness",
      "To reset display"
    ],
    answerIndex: 1
  },
  {
    id: 23,
    chapter: "BANK 2",
    question: "What is the purpose of using a pull-up resistor with a switch?",
    options: [
      "To reduce voltage",
      "To avoid floating input",
      "To increase current",
      "To delay switching"
    ],
    answerIndex: 1
  },
  {
    id: 24,
    chapter: "BANK 2",
    question: "What is the output of the given LED code with delay(1000)?",
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
    chapter: "BANK 2",
    question: "If relay module is active HIGH and digitalWrite(8, LOW) is executed, what happens?",
    options: [
      "Relay turns OFF",
      "Relay turns ON",
      "Board resets",
      "Relay gets damaged"
    ],
    answerIndex: 0
  },
  {
    id: 26,
    chapter: "BANK 2",
    question: "What digit is displayed by the given seven-segment pattern?",
    options: ["8", "0", "1", "6"],
    answerIndex: 2
  },
  {
    id: 27,
    chapter: "BANK 2",
    question: "What will the LCD code display?",
    options: [
      "Only GPN",
      "Only ETX",
      "GPN on line 1 and ETX on line 2",
      "Garbage characters"
    ],
    answerIndex: 2
  },
  {
    id: 28,
    chapter: "BANK 2",
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
    chapter: "BANK 2",
    question: "Which device is commonly used as an embedded system in IoT?",
    options: [
      "CPU tower",
      "Arduino board",
      "Printer",
      "Keyboard"
    ],
    answerIndex: 1
  },
  {
    id: 30,
    chapter: "BANK 2",
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
    chapter: "BANK 2",
    question: "Which describes a disadvantage of IoT?",
    options: [
      "Increased automation",
      "Real-time monitoring",
      "Privacy and security concerns",
      "Improved energy efficiency"
    ],
    answerIndex: 2
  },
  {
    id: 32,
    chapter: "BANK 2",
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
    chapter: "BANK 2",
    question: "Which IoT component is used to track food temperature during transport?",
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
    chapter: "BANK 2",
    question: "Which IoT technology is suitable for automatic light control?",
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
    chapter: "BANK 2",
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
