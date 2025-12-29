import { Question } from '../../types';

export const questionSolvingQuestions: Question[] = [
 
  {
    id: 1001,
    chapter: 'Question Solving',
    question: 'Which of the following best defines a microcontroller?',
    options: [
      'A central processing unit that requires external memory and I/O to function.',
      'A single chip containing a CPU, memory, and I/O peripherals.',
      'A device used solely for amplifying analog signals.',
      'A type of permanent storage memory.'
    ],
    answerIndex: 1
  },
  {
    id: 1002,
    chapter: 'Question Solving',
    question: 'In a microcomputer block diagram, which bus is responsible for selecting a specific memory location?',
    options: ['Data Bus', 'Control Bus', 'Address Bus', 'Power Bus'],
    answerIndex: 2
  },
  {
    id: 1003,
    chapter: 'Question Solving',
    question: 'Which of the following is a key element of a microcomputer system?',
    options: ['CPU (Central Processing Unit)', 'Combustion Engine', 'Hydraulic Pump', 'Gearbox'],
    answerIndex: 0
  },
  {
    id: 1004,
    chapter: 'Question Solving',
    question: 'The data bus in a standard 8-bit microcontroller is typically:',
    options: ['Unidirectional', 'Bidirectional', 'Tridirectional', 'Non-existent'],
    answerIndex: 1
  },
  {
    id: 1005,
    chapter: 'Question Solving',
    question: 'Which bus carries the read/write signals in a microcomputer?',
    options: ['Address Bus', 'Data Bus', 'Control Bus', 'System Bus'],
    answerIndex: 2
  },
  {
    id: 1006,
    chapter: 'Question Solving',
    question: 'What is the primary difference between a microprocessor and a microcontroller regarding memory?',
    options: [
      'Microprocessors have large on-chip memory.',
      'Microcontrollers have on-chip RAM and ROM.',
      'Microcontrollers cannot access memory.',
      'Microprocessors do not use memory.'
    ],
    answerIndex: 1
  },
  {
    id: 1007,
    chapter: 'Question Solving',
    question: 'Which device is generally optimized for general-purpose computing tasks (like a desktop PC)?',
    options: ['Microcontroller', 'Microprocessor', 'Sensor', 'Actuator'],
    answerIndex: 1
  },
  {
    id: 1008,
    chapter: 'Question Solving',
    question: 'Which system is typically more cost-effective for a dedicated application like a washing machine?',
    options: ['Microprocessor-based system', 'Microcontroller-based system', 'Mainframe', 'Supercomputer'],
    answerIndex: 1
  },
  {
    id: 1009,
    chapter: 'Question Solving',
    question: 'The 8051 is an ___ bit microcontroller.',
    options: ['4', '8', '16', '32'],
    answerIndex: 1
  },
  {
    id: 1010,
    chapter: 'Question Solving',
    question: 'What is the size of the on-chip RAM in the standard 8051?',
    options: ['64 Bytes', '128 Bytes', '256 Bytes', '512 Bytes'],
    answerIndex: 1
  },
  {
    id: 1011,
    chapter: 'Question Solving',
    question: 'How much on-chip ROM (Program Memory) does the standard 89C51 have?',
    options: ['1 KB', '2 KB', '4 KB', '8 KB'],
    answerIndex: 2
  },
  {
    id: 1012,
    chapter: 'Question Solving',
    question: 'How many I/O ports does the standard 89C51 have?',
    options: ['2', '3', '4', '5'],
    answerIndex: 2
  },
  {
    id: 1013,
    chapter: 'Question Solving',
    question: 'The 89C51 has how many 16-bit timers?',
    options: ['1', '2', '3', '4'],
    answerIndex: 1
  },
  {
    id: 1014,
    chapter: 'Question Solving',
    question: "The 'C' in 89C51 stands for:",
    options: ['Complex', 'CMOS', 'Control', 'Code'],
    answerIndex: 1
  },
  {
    id: 1015,
    chapter: 'Question Solving',
    question: 'The 89C1051 is a ___-pin package microcontroller.',
    options: ['40', '20', '28', '32'],
    answerIndex: 1
  },
  {
    id: 1016,
    chapter: 'Question Solving',
    question: 'How much Flash memory does the 89C1051 contain?',
    options: ['1 KB', '2 KB', '4 KB', '8 KB'],
    answerIndex: 0
  },
  {
    id: 1017,
    chapter: 'Question Solving',
    question: 'The 89C2051 has ___ KB of Flash memory.',
    options: ['1', '2', '4', '8'],
    answerIndex: 1
  },
  {
    id: 1018,
    chapter: 'Question Solving',
    question: 'Which of the following features is NOT present in the 89C2051 compared to the 89C51?',
    options: ['Internal RAM', 'Timers', 'Port 0 and Port 2', 'CPU'],
    answerIndex: 2
  },
  {
    id: 1019,
    chapter: 'Question Solving',
    question: 'The 89C4051 has ___ pins and ___ KB of Flash memory.',
    options: ['40 pins; 4 KB', '20 pins; 2 KB', '20 pins; 4 KB', '40 pins; 8 KB'],
    answerIndex: 2
  },
  {
    id: 1020,
    chapter: 'Question Solving',
    question: 'The 8051 address bus is ___ bits wide.',
    options: ['8', '12', '16', '32'],
    answerIndex: 2
  },
    {
    id: 1021,
    chapter: 'Question Solving',
    question: 'What is the maximum external memory the 8051 can address?',
    options: ['32 KB', '64 KB', '1 MB', '4 GB'],
    answerIndex: 1
  },
  {
    id: 1022,
    chapter: 'Question Solving',
    question: 'Which register holds the current instruction to be executed?',
    options: ['Accumulator', 'Program Counter (PC)', 'Instruction Register', 'DPTR'],
    answerIndex: 2
  },
  {
    id: 1023,
    chapter: 'Question Solving',
    question: 'Which 8051 port requires external pull-up resistors to function as an output?',
    options: ['Port 0', 'Port 1', 'Port 2', 'Port 3'],
    answerIndex: 0
  },
  {
    id: 1024,
    chapter: 'Question Solving',
    question: 'Which pin must be High to Reset the 8051?',
    options: ['RST', 'EA', 'ALE', 'PSEN'],
    answerIndex: 0
  },
  {
    id: 1025,
    chapter: 'Question Solving',
    question: 'Which of the following is an example of an input device in a microcomputer system?',
    options: ['LED', 'Switch', 'Motor', 'Relay'],
    answerIndex: 1
  },
  {
    id: 1026,
    chapter: 'Question Solving',
    question: 'Which bus allows the CPU to identify which I/O device it wants to communicate with?',
    options: ['Address Bus', 'Data Bus', 'Control Bus', 'Power Bus'],
    answerIndex: 0
  },
  {
    id: 1027,
    chapter: 'Question Solving',
    question: "The specification '4 KB ROM' for an 89C51 refers to:",
    options: ['Data Memory', 'Program Memory', 'Cache Memory', 'Virtual Memory'],
    answerIndex: 1
  },
  {
    id: 1028,
    chapter: 'Question Solving',
    question: 'Which of the following versions is most suitable for a battery-operated toy requiring very little space and simple logic?',
    options: ['89C51', '89C1051', 'Pentium Processor', 'Supercomputer'],
    answerIndex: 1
  },
  {
    id: 1029,
    chapter: 'Question Solving',
    question: 'The 89C2051 is chemically compatible with which logic voltage family?',
    options: ['HVAC', 'TTL / CMOS (5V)', '110V AC', '12V DC only'],
    answerIndex: 1
  },
  {
    id: 1030,
    chapter: 'Question Solving',
    question: 'Which component in a microcomputer block diagram connects the CPU to the outside world?',
    options: ['ALU', 'I/O Ports', 'Registers', 'Cache'],
    answerIndex: 1
  },
  {
    id: 1031,
    chapter: 'Question Solving',
    question: 'A bus in a computer system is best described as:',
    options: [
      'A vehicle for transportation.',
      'A group of wires that transfer data/signals between components.',
      'A specific type of memory.',
      'A power supply unit.'
    ],
    answerIndex: 1
  },
  {
    id: 1032,
    chapter: 'Question Solving',
    question: 'Which 8051 specification dictates how many distinct instructions it can support?',
    options: ['RAM size', 'Instruction Set Architecture (ISA)', 'Power consumption', 'Package type'],
    answerIndex: 1
  },
  {
    id: 1033,
    chapter: 'Question Solving',
    question: "Why is the 8051 family referred to as '8-bit'?",
    options: [
      'It has 8 pins.',
      'Its ALU and Data Bus are 8 bits wide.',
      'It runs at 8 MHz.',
      'It costs 8 dollars.'
    ],
    answerIndex: 1
  },
  {
    id: 1034,
    chapter: 'Question Solving',
    question: 'In the 89C51, the EA pin stands for:',
    options: ['External Access', 'Enable Address', 'Energy Activate', 'Error Accumulator'],
    answerIndex: 0
  },
  {
    id: 1035,
    chapter: 'Question Solving',
    question: 'Which of the following is a specification of the 89C4051?',
    options: ['40 Pins', '4 KB Flash Memory', 'No Timers', 'No I/O'],
    answerIndex: 1
  },
  {
    id: 1036,
    chapter: 'Question Solving',
    question: 'Microcontrollers are often used in real-time applications. What does this mean?',
    options: [
      'They tell the time of day.',
      'They respond to inputs within a guaranteed time constraint.',
      'They run very slowly.',
      'They only work when the user is watching.'
    ],
    answerIndex: 1
  },
  {
    id: 1037,
    chapter: 'Question Solving',
    question: 'The program memory in the 89Cxxx series is Flash type. What is the main advantage of Flash?',
    options: [
      'It is faster than RAM.',
      'It is electrically erasable and reprogrammable.',
      'It deletes itself when power is lost.',
      'It cannot be changed.'
    ],
    answerIndex: 1
  },
  {
    id: 1038,
    chapter: 'Question Solving',
    question: 'Which element of a microcomputer provides temporary storage for data being processed?',
    options: ['ROM', 'RAM', 'Hard Disk', 'EEPROM'],
    answerIndex: 1
  },
  {
    id: 1039,
    chapter: 'Question Solving',
    question: 'The 89C2051 is often used instead of the 89C51 when:',
    options: [
      'More I/O pins are needed.',
      'PCB space is limited and fewer I/O pins are required.',
      'Higher processing speed is required.',
      'More memory is required.'
    ],
    answerIndex: 1
  },
  {
    id: 1040,
    chapter: 'Question Solving',
    question: 'Which bus is bidirectional?',
    options: ['Address Bus', 'Data Bus', 'Power Line', 'Clock Signal'],
    answerIndex: 1
  },
  {
    id: 1041,
    chapter: 'Question Solving',
    question: 'What is the function of the Crystal Oscillator in the block diagram?',
    options: [
      'To provide power.',
      'To provide the clock signal for timing.',
      'To store data.',
      'To reset the device.'
    ],
    answerIndex: 1
  },
  {
    id: 1042,
    chapter: 'Question Solving',
    question: 'Which of the following is NOT a member of the 89C series?',
    options: ['89C51', '89C1051', '89C2051', 'Core i7'],
    answerIndex: 3
  },
  {
    id: 1043,
    chapter: 'Question Solving',
    question: "The number '51' in 89C51 indicates it is compatible with which architecture?",
    options: ['MCS-51 (Intel 8051)', 'x86', 'ARM', 'AVR'],
    answerIndex: 0
  },
  {
    id: 1044,
    chapter: 'Question Solving',
    question: 'In a block diagram, arrows on the Address Bus typically point:',
    options: [
      'From Memory to CPU',
      'From CPU to Memory/Peripherals',
      'Both ways',
      'Nowhere'
    ],
    answerIndex: 1
  },
  {
    id: 1045,
    chapter: 'Question Solving',
    question: 'The 89C1051 has 1KB memory. What does KB stand for?',
    options: ['Kilo Bits', 'Kilo Bytes', 'Kernel Base', 'Key Board'],
    answerIndex: 1
  },
  {
    id: 1046,
    chapter: 'Question Solving',
    question: 'A microcontroller is best described as a system on a:',
    options: ['Board', 'Chip', 'Disk', 'Cloud'],
    answerIndex: 1
  },
  {
    id: 1047,
    chapter: 'Question Solving',
    question: 'Which of these is a disadvantage of a microcontroller compared to a microprocessor?',
    options: [
      'Higher cost.',
      'Lower computing power/speed.',
      'Larger size.',
      'Higher power consumption.'
    ],
    answerIndex: 1
  },
  {
    id: 1048,
    chapter: 'Question Solving',
    question: 'The 89C51 generally uses which type of package?',
    options: [
      'DIP (Dual Inline Package)',
      'BGA (Ball Grid Array)',
      'LGA',
      'Socket 775'
    ],
    answerIndex: 0
  },
  {
    id: 1049,
    chapter: 'Question Solving',
    question: "Which version is the 'full featured' standard among the list?",
    options: ['89C51', '89C1051', '89C2051', '89C4051'],
    answerIndex: 0
  },
  {
    id: 1050,
    chapter: 'Question Solving',
    question: 'The primary role of the Control Bus is to:',
    options: [
      'Store data.',
      'Synchronize and control operations.',
      'Supply 5V.',
      'Calculate math.'
    ],
    answerIndex: 1
  },
    {
    id: 1051,
    chapter: 'Question Solving',
    question: 'In a microcomputer, the CPU is primarily responsible for:',
    options: [
      'Storing data',
      'Displaying output',
      'Performing arithmetic and logical operations',
      'Power supply regulation'
    ],
    answerIndex: 2
  },
  {
    id: 1052,
    chapter: 'Question Solving',
    question: 'Booting a microcomputer means:',
    options: [
      'Restarting the system',
      'Deleting files',
      'Starting up and loading the operating system',
      'Installing new software'
    ],
    answerIndex: 2
  },
  {
    id: 1053,
    chapter: 'Question Solving',
    question: 'ARM Cortex-M microcontrollers are best known for which feature?',
    options: [
      'High-power consumption',
      'Complex Instruction Set Computing (CISC)',
      'Low-power, high-efficiency performance',
      '64-bit architecture only'
    ],
    answerIndex: 2
  },
  {
    id: 1054,
    chapter: 'Question Solving',
    question: 'What is the main characteristic of an embedded system?',
    options: [
      'General-purpose computing',
      'High power consumption',
      'Performs a dedicated function',
      'Requires a large operating system'
    ],
    answerIndex: 2
  },
  {
    id: 1055,
    chapter: 'Question Solving',
    question: 'What does “real-time” in real-time embedded systems mean?',
    options: [
      'High data rate',
      'Multi-user support',
      'Response within a strict time deadline',
      'Long-term processing'
    ],
    answerIndex: 2
  },
  {
    id: 1056,
    chapter: 'Question Solving',
    question: 'Which term is commonly associated with embedded systems?',
    options: ['BIOS', 'Firmware', 'GPU acceleration', 'Compiler optimization'],
    answerIndex: 1
  },
  {
    id: 1057,
    chapter: 'Question Solving',
    question: 'What is the function of I/O interfaces in embedded hardware?',
    options: [
      'Increase processing speed',
      'Store large data',
      'Enable communication with external devices',
      'Generate power'
    ],
    answerIndex: 2
  },
  {
    id: 1058,
    chapter: 'Question Solving',
    question: 'Arduino boards are based on which type of microcontroller?',
    options: [
      'Intel 8085',
      'ATMega series (AVR)',
      'ARM Cortex-A series',
      'PIC16F877A'
    ],
    answerIndex: 1
  },
  {
    id: 1059,
    chapter: 'Question Solving',
    question: 'Arduino is termed as an open-source platform because:',
    options: [
      'It is free for educational use only',
      'Its hardware design and software code are freely available',
      'It does not require a microcontroller',
      'It works only with paid libraries'
    ],
    answerIndex: 1
  },
  {
    id: 1060,
    chapter: 'Question Solving',
    question: 'Which interface is used to program the Arduino UNO R3?',
    options: ['RS-232', 'USB Type-B port', 'Ethernet', 'Wi-Fi'],
    answerIndex: 1
  },
  {
    id: 1061,
    chapter: 'Question Solving',
    question: 'The ICSP header is used for:',
    options: [
      'Uploading sketches via USB',
      'Programming the ATmega328P directly',
      'Connecting sensors',
      'Power supply input'
    ],
    answerIndex: 1
  },
  {
    id: 1062,
    chapter: 'Question Solving',
    question: 'Which Arduino function combination is best to read analog value from A1?',
    options: [
      'digitalRead(A1)',
      'analogRead(A1) followed by scaling',
      'pinMode(A1, INPUT_PULLUP)',
      'analogWrite(A1)'
    ],
    answerIndex: 1
  },
  {
    id: 1063,
    chapter: 'Question Solving',
    question: 'Which is the best declaration to protect a constant threshold value?',
    options: [
      'int threshold = 500;',
      'static int threshold = 500;',
      'const int threshold = 500;',
      'float threshold = 500.0;'
    ],
    answerIndex: 2
  },
  {
    id: 1064,
    chapter: 'Question Solving',
    question: 'Which mode keeps a pushbutton HIGH unless pressed?',
    options: [
      'pinMode(pin, INPUT);',
      'pinMode(pin, INPUT_PULLUP);',
      'pinMode(pin, OUTPUT);',
      'pinMode(pin, ANALOG);'
    ],
    answerIndex: 1
  },
  {
    id: 1065,
    chapter: 'Question Solving',
    question: 'A function that turns ON an LED and returns nothing should be:',
    options: [
      'int turnOnLED()',
      'float turnOnLED()',
      'void turnOnLED()',
      'bool turnOnLED()'
    ],
    answerIndex: 2
  },
  {
    id: 1066,
    chapter: 'Question Solving',
    question: 'Which Arduino function configures a pin as input or output?',
    options: ['digitalWrite()', 'pinMode()', 'digitalRead()', 'analogWrite()'],
    answerIndex: 1
  },
  {
    id: 1067,
    chapter: 'Question Solving',
    question: 'The value returned by digitalRead() is:',
    options: ['Any integer', '0 or 1023', 'HIGH or LOW', 'True only'],
    answerIndex: 2
  },
  {
    id: 1068,
    chapter: 'Question Solving',
    question: 'A push button connected to Arduino is classified as:',
    options: ['Output Device', 'Memory Device', 'Input Device', 'Communication Device'],
    answerIndex: 2
  },
  {
    id: 1069,
    chapter: 'Question Solving',
    question: 'Why is a current-limiting resistor required for an LED?',
    options: [
      'Increase brightness',
      'Reduce voltage',
      'Prevent excess current damage',
      'Make LED blink'
    ],
    answerIndex: 2
  },
  {
    id: 1070,
    chapter: 'Question Solving',
    question: 'When using INPUT_PULLUP, what is the logic?',
    options: [
      'Pressed → HIGH',
      'Pressed → LOW',
      'Always HIGH',
      'Always LOW'
    ],
    answerIndex: 1
  },
  {
    id: 1071,
    chapter: 'Question Solving',
    question: 'Why is a relay module used for high-voltage AC loads?',
    options: [
      'Reduce AC voltage',
      'Increase Arduino current',
      'Provide electrical isolation',
      'Convert DC to AC'
    ],
    answerIndex: 2
  },
  {
    id: 1072,
    chapter: 'Question Solving',
    question: 'How do you blink an LED every second?',
    options: [
      'digitalRead() in setup()',
      'digitalWrite() with delay(1000)',
      'analogRead()',
      'pinMode(INPUT)'
    ],
    answerIndex: 1
  },
  {
    id: 1073,
    chapter: 'Question Solving',
    question: 'Can an Arduino pin supply 300mA directly to a DC motor?',
    options: [
      'Yes',
      'No, use transistor or motor driver',
      'Yes, with PWM',
      'No, use resistor'
    ],
    answerIndex: 1
  },
  {
    id: 1074,
    chapter: 'Question Solving',
    question: 'Correct sequence to display temperature on 16x2 LCD:',
    options: [
      'pinMode → digitalRead',
      'LiquidCrystal.begin → lcd.print',
      'analogWrite → lcd.print',
      'delay → digitalWrite'
    ],
    answerIndex: 1
  },
  {
    id: 1075,
    chapter: 'Question Solving',
    question: 'What happens in the Stepper motor program?',
    options: [
      'Motor rotates 100 steps forward, pauses 1s',
      'Motor rotates continuously',
      'Motor does not move',
      'Motor rotates backward'
    ],
    answerIndex: 0
  },
  {
    id: 1076,
    chapter: 'Question Solving',
    question: 'What happens to LED on pin 13?',
    options: ['LED blinks', 'LED stays ON', 'LED stays OFF', 'LED toggles'],
    answerIndex: 1
  },
  {
    id: 1077,
    chapter: 'Question Solving',
    question: 'What happens to the relay?',
    options: [
      'Always OFF',
      'ON 2s, OFF 2s',
      'Always ON',
      'Trips immediately'
    ],
    answerIndex: 1
  },
  {
    id: 1078,
    chapter: 'Question Solving',
    question: 'Which is an example of an IoT device?',
    options: [
      'Smart thermostat',
      'Traditional light switch',
      'Desktop computer without network',
      'Printed book'
    ],
    answerIndex: 0
  },
  {
    id: 1079,
    chapter: 'Question Solving',
    question: 'Which is a key feature of IoT?',
    options: [
      'Manual operation',
      'Interconnection and communication',
      'Standalone only',
      'No sensors'
    ],
    answerIndex: 1
  },
  {
    id: 1080,
    chapter: 'Question Solving',
    question: 'Which IoT layer processes and analyzes data?',
    options: [
      'Perception Layer',
      'Network Layer',
      'Application Layer',
      'Edge/Processing Layer'
    ],
    answerIndex: 3
  },
  {
    id: 1081,
    chapter: 'Question Solving',
    question: 'Role of Network Layer in IoT:',
    options: [
      'Collect sensor data',
      'Provide connectivity and data transfer',
      'Run analytics',
      'Display data'
    ],
    answerIndex: 1
  },
  {
    id: 1082,
    chapter: 'Question Solving',
    question: 'Why are actuators essential in IoT?',
    options: [
      'Sense environment',
      'Take action',
      'Store data',
      'Provide internet'
    ],
    answerIndex: 1
  },
  {
    id: 1083,
    chapter: 'Question Solving',
    question: 'If NodeMCU loses WiFi, relay behavior is:',
    options: [
      'Remains last state',
      'Turns OFF',
      'Blinks',
      'Resets'
    ],
    answerIndex: 0
  },
  {
    id: 1084,
    chapter: 'Question Solving',
    question: 'What happens if AC bulb is switched directly via NodeMCU GPIO?',
    options: [
      'NodeMCU burns',
      'Bulb works',
      'NodeMCU blinks',
      'Nothing happens'
    ],
    answerIndex: 0
  },
  {
    id: 1085,
    chapter: 'Question Solving',
    question: 'Smart agriculture system detects dry soil. What happens next?',
    options: [
      'Cloud opens irrigation valve automatically',
      'Cloud stores data only',
      'Farmer checks manually',
      'Sensor shuts down'
    ],
    answerIndex: 0
  },
  {
    id: 1086,
    chapter: 'Question Solving',
    question: 'Which bus in a microcomputer is bidirectional?',
    options: ['Address Bus', 'Data Bus', 'Control Bus', 'Power Bus'],
    answerIndex: 1
  },
  {
    id: 1087,
    chapter: 'Question Solving',
    question: 'The 89C51 microcontroller has ______ of internal RAM.',
    options: ['64 Bytes', '128 Bytes', '256 Bytes', '512 Bytes'],
    answerIndex: 1
  },
  {
    id: 1088,
    chapter: 'Question Solving',
    question: 'Which version of the 8051 family comes in a 20-pin package and has 2KB of Flash memory?',
    options: ['89C51', '89C1051', '89C2051', '89C52'],
    answerIndex: 2
  },
  {
    id: 1089,
    chapter: 'Question Solving',
    question: 'A key difference between a Microprocessor and a Microcontroller is:',
    options: [
      'Microprocessors have built-in RAM/ROM.',
      'Microcontrollers have built-in RAM/ROM and I/O.',
      'Microcontrollers act as the brain of a desktop computer.',
      'Microprocessors are used for specific embedded tasks.'
    ],
    answerIndex: 1
  },
  {
    id: 1090,
    chapter: 'Question Solving',
    question: 'How much On-chip Flash Memory does the standard 89C51 have?',
    options: ['1 KB', '2 KB', '4 KB', '8 KB'],
    answerIndex: 2
  },

  // Unit II
  {
    id: 1091,
    chapter: 'Question Solving',
    question: 'Which of the following is an example of an Embedded System?',
    options: ['A Washing Machine', 'A Laptop', 'A Web Server', 'A Desktop PC'],
    answerIndex: 0
  },
  {
    id: 1092,
    chapter: 'Question Solving',
    question: 'The ATMega328 microcontroller is most famously used in which development board?',
    options: ['NodeMCU', 'Raspberry Pi', 'Arduino UNO', 'BeagleBone'],
    answerIndex: 2
  },
  {
    id: 1093,
    chapter: 'Question Solving',
    question: 'Advanced microcontrollers like ARM are typically based on which architecture?',
    options: ['CISC', 'RISC', 'Analog Logic', '4-bit Logic'],
    answerIndex: 1
  },
  {
    id: 1094,
    chapter: 'Question Solving',
    question: 'Which microcontroller is generally used for high-end mobile applications?',
    options: ['8051', 'PIC16', 'ARM', 'AVR'],
    answerIndex: 2
  },
  {
    id: 1095,
    chapter: 'Question Solving',
    question: 'How many pins does the standard DIP package of ATMega328 have?',
    options: ['20', '28', '40', '64'],
    answerIndex: 1
  },
  {
    id: 1096,
    chapter: 'Question Solving',
    question: 'Which is a disadvantage of an embedded system?',
    options: [
      'High cost',
      'Large size',
      'Difficult to upgrade for different tasks',
      'High power consumption'
    ],
    answerIndex: 2
  },

  // Unit III
  {
    id: 1097,
    chapter: 'Question Solving',
    question: 'The Arduino UNO R3 operates at what logic voltage?',
    options: ['3.3V', '5V', '9V', '12V'],
    answerIndex: 1
  },
  {
    id: 1098,
    chapter: 'Question Solving',
    question: 'Which function runs continuously in Arduino?',
    options: ['setup()', 'main()', 'loop()', 'start()'],
    answerIndex: 2
  },
  {
    id: 1099,
    chapter: 'Question Solving',
    question: 'Correct syntax to configure pin 13 as output?',
    options: [
      'pinMode(13, OUTPUT);',
      'PinMode(13, output);',
      'setPin(13, OUT);',
      'configPin(13, 1);'
    ],
    answerIndex: 0
  },
  {
    id: 1100,
    chapter: 'Question Solving',
    question: 'Which component enables Arduino UNO to communicate via USB?',
    options: [
      'Power Jack',
      'Voltage Regulator',
      'USB-to-Serial converter',
      'Reset Button'
    ],
    answerIndex: 2
  },
  {
    id: 1101,
    chapter: 'Question Solving',
    question: 'Which function writes HIGH to a digital pin?',
    options: ['digitalRead()', 'digitalWrite()', 'analogWrite()', 'Serial.print()'],
    answerIndex: 1
  },
  {
    id: 1102,
    chapter: 'Question Solving',
    question: 'Blinking Inbuilt LED refers to:',
    options: [
      'Drawing LED diagram',
      'Writing program to toggle onboard LED',
      'Installing driver',
      'Measuring voltage'
    ],
    answerIndex: 1
  },
  {
    id: 1103,
    chapter: 'Question Solving',
    question: 'Which data type stores a single character?',
    options: ['int', 'float', 'char', 'long'],
    answerIndex: 2
  },
  {
    id: 1104,
    chapter: 'Question Solving',
    question: 'How many Analog Input pins does Arduino UNO have?',
    options: ['4', '6', '14', '20'],
    answerIndex: 1
  },
  {
    id: 1105,
    chapter: 'Question Solving',
    question: '// symbol is used for:',
    options: ['Division', 'Single-line comments', 'Multiplication', 'Declaring function'],
    answerIndex: 1
  },
  {
    id: 1106,
    chapter: 'Question Solving',
    question: 'Which pins support PWM on Arduino UNO?',
    options: [
      'A0–A2',
      '0,1',
      '3,5,6,9,10,11',
      '13'
    ],
    answerIndex: 2
  },
  {
    id: 1107,
    chapter: 'Question Solving',
    question: 'Serial.begin(9600) is placed inside:',
    options: ['loop()', 'setup()', 'Outside all functions', 'end()'],
    answerIndex: 1
  },

  // Unit IV
  {
    id: 1108,
    chapter: 'Question Solving',
    question: 'Why is a resistor used with an LED?',
    options: [
      'Increase brightness',
      'Limit current',
      'Change color',
      'Make it blink'
    ],
    answerIndex: 1
  },
  {
    id: 1109,
    chapter: 'Question Solving',
    question: 'To control AC bulb with Arduino, use:',
    options: ['Relay Module', 'Capacitor', 'Resistor', 'Potentiometer'],
    answerIndex: 0
  },
  {
    id: 1110,
    chapter: 'Question Solving',
    question: '7-segment display uses how many pins (excluding DP)?',
    options: ['5', '7', '10', '16'],
    answerIndex: 1
  },
  {
    id: 1111,
    chapter: 'Question Solving',
    question: 'Which library is used for 16x2 LCD?',
    options: ['Servo.h', 'LiquidCrystal.h', 'Stepper.h', 'WiFi.h'],
    answerIndex: 1
  },
  {
    id: 1112,
    chapter: 'Question Solving',
    question: 'Which function displays text on LCD?',
    options: ['lcd.show()', 'lcd.print()', 'lcd.write()', 'Serial.println()'],
    answerIndex: 1
  },
  {
    id: 1113,
    chapter: 'Question Solving',
    question: 'A 4x4 matrix keypad needs how many pins?',
    options: ['4', '8', '16', '22'],
    answerIndex: 1
  },
  {
    id: 1114,
    chapter: 'Question Solving',
    question: 'Which motor moves in discrete steps?',
    options: ['DC Motor', 'Stepper Motor', 'Servo Motor', 'Induction Motor'],
    answerIndex: 1
  },
  {
    id: 1115,
    chapter: 'Question Solving',
    question: 'IR sensor is used for:',
    options: ['Temperature', 'Obstacle detection', 'Sound', 'Time'],
    answerIndex: 1
  },
  {
    id: 1116,
    chapter: 'Question Solving',
    question: 'Which component generates sound?',
    options: ['Relay', 'Buzzer', 'LED', 'LCD'],
    answerIndex: 1
  },
  {
    id: 1117,
    chapter: 'Question Solving',
    question: 'delay(1000) means:',
    options: [
      '1000 seconds',
      '1000 microseconds',
      '1000 milliseconds',
      '1 minute'
    ],
    answerIndex: 2
  },
  {
    id: 1118,
    chapter: 'Question Solving',
    question: 'Which is an INPUT device?',
    options: ['LED', 'Relay', 'Switch', 'Motor'],
    answerIndex: 2
  },
  {
    id: 1119,
    chapter: 'Question Solving',
    question: 'digitalRead() returns:',
    options: ['0–1023', 'HIGH or LOW', 'Voltage', 'Character'],
    answerIndex: 1
  },
  {
    id: 1120,
    chapter: 'Question Solving',
    question: 'Stepper motor driver IC:',
    options: ['ULN2003', '555 Timer', '741 OpAmp', 'LM35'],
    answerIndex: 0
  },
  {
    id: 1121,
    chapter: 'Question Solving',
    question: 'Potentiometer at V0 of LCD is used for:',
    options: [
      'Backlight',
      'Contrast control',
      'Power',
      'Font selection'
    ],
    answerIndex: 1
  },
  {
    id: 1122,
    chapter: 'Question Solving',
    question: 'Temperature sensor commonly used:',
    options: ['IR Sensor', 'LM35/DHT11', 'Ultrasonic', 'PIR'],
    answerIndex: 1
  },
  {
    id: 1123,
    chapter: 'Question Solving',
    question: 'Keypad library is used for:',
    options: [
      'Motor control',
      'Scanning matrix keyboard',
      'WiFi connection',
      'Playing music'
    ],
    answerIndex: 1
  },
  {
    id: 1124,
    chapter: 'Question Solving',
    question: 'NO pin in relay means:',
    options: ['Not Open', 'Normally Open', 'New Output', 'Negative Output'],
    answerIndex: 1
  },

  // Unit V
  {
    id: 1125,
    chapter: 'Question Solving',
    question: 'IoT stands for:',
    options: ['Input of Technology', 'Internet of Things', 'Internet of Tools', 'Interconnected Things'],
    answerIndex: 1
  },
  {
    id: 1126,
    chapter: 'Question Solving',
    question: 'IoT layer with sensors & actuators:',
    options: ['Application', 'Network', 'Perception', 'Cloud'],
    answerIndex: 2
  },
  {
    id: 1127,
    chapter: 'Question Solving',
    question: 'Board with built-in WiFi:',
    options: ['Arduino UNO', 'NodeMCU', '8051', 'ATmega328'],
    answerIndex: 1
  },
  {
    id: 1128,
    chapter: 'Question Solving',
    question: 'HC-05 module provides:',
    options: ['WiFi', 'Bluetooth', 'GSM', 'GPS'],
    answerIndex: 1
  },
  {
    id: 1129,
    chapter: 'Question Solving',
    question: 'IoT platform for data visualization:',
    options: ['MS Paint', 'ThingSpeak', 'Notepad', 'VLC'],
    answerIndex: 1
  },
  {
    id: 1130,
    chapter: 'Question Solving',
    question: 'Sense HAT LED matrix is:',
    options: ['16x2', '8x8 RGB', '7-segment', '4x4'],
    answerIndex: 1
  },
  {
    id: 1131,
    chapter: 'Question Solving',
    question: 'Raspberry Pi differs from Arduino because:',
    options: [
      'It is 8-bit',
      'It is an SBC running OS',
      'It has no pins',
      'No internet'
    ],
    answerIndex: 1
  },
  {
    id: 1132,
    chapter: 'Question Solving',
    question: 'In home light control, AC bulb is switched by:',
    options: ['NodeMCU directly', 'Relay Module', 'Resistor', 'Capacitor'],
    answerIndex: 1
  },
  {
    id: 1133,
    chapter: 'Question Solving',
    question: 'Blynk is used for:',
    options: [
      'Mobile apps for IoT control',
      'Writing C code',
      'PCB design',
      'Offline calculations'
    ],
    answerIndex: 0
  },
  {
    id: 1134,
    chapter: 'Question Solving',
    question: 'Advantage of IoT in industry:',
    options: [
      'Manual data entry',
      'Real-time monitoring',
      'More wiring',
      'Slower production'
    ],
    answerIndex: 1
  },
  {
    id: 1135,
    chapter: 'Question Solving',
    question: 'NodeMCU connects to internet using:',
    options: ['Ethernet', 'WiFi Router', 'USB Cable', 'Bluetooth Speaker'],
    answerIndex: 1
  },
  {
    id: 1136,
    chapter: 'Question Solving',
    question: 'Which of the following best describes the main difference between a Microprocessor and a Microcontroller?',
    options: [
      'Microprocessors have built-in RAM and ROM, while Microcontrollers do not.',
      'Microcontrollers have a CPU, RAM, ROM, and I/O peripherals on a single chip.',
      'Microcontrollers are used for general-purpose computing like laptops.',
      'Microprocessors operate on analog signals only.'
    ],
    answerIndex: 1
  },
  {
    id: 1137,
    chapter: 'Question Solving',
    question: 'The standard 8051 microcontroller has an _______ data bus.',
    options: ['4-bit', '8-bit', '16-bit', '32-bit'],
    answerIndex: 1
  },
  {
    id: 1138,
    chapter: 'Question Solving',
    question: 'Which bus in a microcomputer is typically bidirectional?',
    options: ['Address Bus', 'Data Bus', 'Control Bus', 'Power Bus'],
    answerIndex: 1
  },
  {
    id: 1139,
    chapter: 'Question Solving',
    question: 'What is the size of the internal RAM in a standard 8051 microcontroller?',
    options: ['64 Bytes', '128 Bytes', '256 Bytes', '4 KB'],
    answerIndex: 1
  },
  {
    id: 1140,
    chapter: 'Question Solving',
    question: 'Which version of the 8051 family comes in a 20-pin package?',
    options: ['89C51', '89C52', '89C2051', '8031'],
    answerIndex: 2
  },
  {
    id: 1141,
    chapter: 'Question Solving',
    question: 'An Embedded System is best defined as:',
    options: [
      'A general-purpose computer like a laptop.',
      'A computing system designed for a specific, dedicated function.',
      'A purely mechanical system.',
      'A system connected to the internet.'
    ],
    answerIndex: 1
  },
  {
    id: 1142,
    chapter: 'Question Solving',
    question: 'The ATMega328 microcontroller is the core of which development board?',
    options: ['NodeMCU', 'Raspberry Pi', 'Arduino UNO R3', '8051 Development Board'],
    answerIndex: 2
  },
  {
    id: 1143,
    chapter: 'Question Solving',
    question: 'Which architecture uses separate memory paths for program and data?',
    options: ['Von Neumann', 'Harvard', 'CISC', 'RISC'],
    answerIndex: 1
  },
  {
    id: 1144,
    chapter: 'Question Solving',
    question: 'The Arduino UNO R3 operates at a logic voltage level of:',
    options: ['12V', '3.3V', '5V', '24V'],
    answerIndex: 2
  },
  {
    id: 1145,
    chapter: 'Question Solving',
    question: 'Which software is used to write and upload code to Arduino boards?',
    options: ['Keil uVision', 'Arduino IDE', 'Python IDLE', 'Visual Studio Code only'],
    answerIndex: 1
  },
  {
    id: 1146,
    chapter: 'Question Solving',
    question: 'In an Arduino sketch, the setup() function runs:',
    options: [
      'Continuously',
      'Once, when powered on or reset',
      'Every time a button is pressed',
      'Never'
    ],
    answerIndex: 1
  },
  {
    id: 1147,
    chapter: 'Question Solving',
    question: 'What is the correct syntax to define a pin as an Output in Arduino?',
    options: [
      'pinMode(13, OUTPUT);',
      'setPin(13, OUT);',
      'PinMode(13, output);',
      'output(13);'
    ],
    answerIndex: 0
  },
  {
    id: 1148,
    chapter: 'Question Solving',
    question: 'Which function is used to turn a digital pin ON (5V)?',
    options: [
      'digitalRead()',
      'analogWrite()',
      'digitalWrite(pin, HIGH);',
      'digitalWrite(pin, LOW);'
    ],
    answerIndex: 2
  },
  {
    id: 1149,
    chapter: 'Question Solving',
    question: 'The delay(1000) function pauses execution for:',
    options: [
      '1000 seconds',
      '1000 microseconds',
      '1000 milliseconds (1 second)',
      '1 minute'
    ],
    answerIndex: 2
  },
  {
    id: 1150,
    chapter: 'Question Solving',
    question: 'Which variable type is best for storing a whole number like 100?',
    options: ['float', 'char', 'int', 'boolean'],
    answerIndex: 2
  },
  {
    id: 1151,
    chapter: 'Question Solving',
    question: 'How many Analog Input pins does the Arduino UNO R3 have?',
    options: ['4', '6', '14', '8'],
    answerIndex: 1
  },
  {
    id: 1152,
    chapter: 'Question Solving',
    question: 'To start Serial communication with a PC, which command is used?',
    options: [
      'Serial.start()',
      'Serial.begin(9600);',
      'Serial.init()',
      'Serial.print()'
    ],
    answerIndex: 1
  },
  {
    id: 1153,
    chapter: 'Question Solving',
    question: 'Why is a resistor placed in series with an LED?',
    options: [
      'To increase voltage',
      'To limit current and protect the LED',
      'To make the LED blink',
      'To change the color'
    ],
    answerIndex: 1
  },
  {
    id: 1154,
    chapter: 'Question Solving',
    question: 'Which component is used to switch a 230V AC appliance using Arduino?',
    options: ['Resistor', 'Relay Module', 'Capacitor', 'Diode'],
    answerIndex: 1
  },
  {
    id: 1155,
    chapter: 'Question Solving',
    question: 'The Arduino UNO USB port is used for:',
    options: [
      'Power Supply',
      'Uploading Code',
      'Serial Communication',
      'All of the above'
    ],
    answerIndex: 3
  },
  {
    id: 1156,
    chapter: 'Question Solving',
    question: 'A standard 7-segment display uses how many LEDs to form the number 8?',
    options: ['5', '7', '9', '10'],
    answerIndex: 1
  },
  {
    id: 1157,
    chapter: 'Question Solving',
    question: 'Which library is commonly used to interface a 16x2 LCD with Arduino?',
    options: ['Servo.h', 'LiquidCrystal.h', 'WiFi.h', 'Stepper.h'],
    answerIndex: 1
  },
  {
    id: 1158,
    chapter: 'Question Solving',
    question: 'Which function prints text to the LCD?',
    options: ['lcd.print()', 'lcd.scan()', 'lcd.read()', 'Serial.print()'],
    answerIndex: 0
  },
  {
    id: 1159,
    chapter: 'Question Solving',
    question: 'A 4x4 Keypad has how many total keys?',
    options: ['8', '12', '16', '20'],
    answerIndex: 2
  },
  {
    id: 1160,
    chapter: 'Question Solving',
    question: 'Which motor is best suited for precise angular positioning?',
    options: ['DC Motor', 'Stepper Motor', 'Fan', 'Vibration Motor'],
    answerIndex: 1
  },
  {
    id: 1161,
    chapter: 'Question Solving',
    question: 'The ULN2003 IC is often used as a _______ for stepper motors.',
    options: ['Microcontroller', 'Driver', 'Sensor', 'Power Supply'],
    answerIndex: 1
  },
  {
    id: 1162,
    chapter: 'Question Solving',
    question: 'An IR Sensor detects obstacles by using:',
    options: ['Sound waves', 'Infrared Light', 'Radio waves', 'Magnetic fields'],
    answerIndex: 1
  },
  {
    id: 1163,
    chapter: 'Question Solving',
    question: 'Which device is an audio output device?',
    options: ['Microphone', 'Buzzer', 'LDR', 'Potentiometer'],
    answerIndex: 1
  },
  {
    id: 1164,
    chapter: 'Question Solving',
    question: 'IoT stands for:',
    options: ['Input of Technology', 'Internet of Things', 'Internet of Tools', 'Interface of Things'],
    answerIndex: 1
  },
  {
    id: 1165,
    chapter: 'Question Solving',
    question: 'Which IoT layer includes sensors and actuators?',
    options: [
      'Perception / Sensing Layer',
      'Network Layer',
      'Application Layer',
      'Cloud Layer'
    ],
    answerIndex: 0
  },
  {
    id: 1166,
    chapter: 'Question Solving',
    question: 'The NodeMCU is based on which WiFi chip?',
    options: ['ATmega328', 'ESP8266', '8051', 'ARM Cortex'],
    answerIndex: 1
  },
  {
    id: 1167,
    chapter: 'Question Solving',
    question: 'What voltage does the NodeMCU operate at?',
    options: ['5V', '3.3V', '12V', '9V'],
    answerIndex: 1
  },
  {
    id: 1168,
    chapter: 'Question Solving',
    question: 'Raspberry Pi is different from Arduino because it is a:',
    options: ['Microcontroller', 'Single Board Computer (SBC)', 'Sensor', 'WiFi Module'],
    answerIndex: 1
  },
  {
    id: 1169,
    chapter: 'Question Solving',
    question: 'ThingSpeak is primarily used for:',
    options: [
      'Graphic Design',
      'Data Visualization and Analytics',
      'Writing Documents',
      'Playing Music'
    ],
    answerIndex: 1
  },
  {
    id: 1170,
    chapter: 'Question Solving',
    question: 'Blynk is an IoT platform known for:',
    options: [
      'Mobile app builder for IoT control',
      'Manufacturing chips',
      'Offline text editing',
      'Operating Systems'
    ],
    answerIndex: 0
  },
  {
    id: 1171,
    chapter: 'Question Solving',
    question: 'HC-05 is a module for which communication?',
    options: ['WiFi', 'Bluetooth', 'Zigbee', 'LoRa'],
    answerIndex: 1
  },
  {
    id: 1172,
    chapter: 'Question Solving',
    question: 'The Sense HAT features an LED matrix of size:',
    options: ['16x2', '8x8 RGB', '4x4', '128x64'],
    answerIndex: 1
  },
  {
    id: 1173,
    chapter: 'Question Solving',
    question: 'To detect an object using an IR sensor, which function is used?',
    options: ['analogWrite()', 'digitalRead()', 'Serial.print()', 'delay()'],
    answerIndex: 1
  },
  {
    id: 1174,
    chapter: 'Question Solving',
    question: 'analogRead() returns a value between:',
    options: ['0 and 1', '0 and 255', '0 and 1023', '0 and 100'],
    answerIndex: 2
  },
  {
    id: 1175,
    chapter: 'Question Solving',
    question: 'Which of these is an Input Device?',
    options: ['LED', 'Push Button / Switch', 'Motor', 'Relay'],
    answerIndex: 1
  },
  {
    id: 1176,
    chapter: 'Question Solving',
    question: 'The Reset pin on the 8051 is active:',
    options: ['Low', 'High', 'Floating', 'Negative'],
    answerIndex: 1
  },
  {
    id: 1177,
    chapter: 'Question Solving',
    question: 'How many bits is the Address Bus of the 8051?',
    options: ['8', '16', '20', '32'],
    answerIndex: 1
  },
  {
    id: 1178,
    chapter: 'Question Solving',
    question: "In the 89C51, 'C' stands for:",
    options: ['CMOS', 'Control', 'Computer', 'Core'],
    answerIndex: 0
  },
  {
    id: 1179,
    chapter: 'Question Solving',
    question: 'Which component is internal in a microcontroller but external in a microprocessor?',
    options: ['ALU', 'RAM / ROM', 'Registers', 'Buses'],
    answerIndex: 1
  },
  {
    id: 1180,
    chapter: 'Question Solving',
    question: 'The maximum external memory the 8051 can address is:',
    options: ['32 KB', '64 KB', '1 MB', '4 GB'],
    answerIndex: 1
  },
  {
    id: 1181,
    chapter: 'Question Solving',
    question: 'Which pin on Arduino UNO has a built-in LED?',
    options: ['Pin 10', 'Pin 13', 'Pin 0', 'Pin 5'],
    answerIndex: 1
  },
  {
    id: 1182,
    chapter: 'Question Solving',
    question: 'A Sketch in Arduino is:',
    options: ['A drawing', 'The program code', 'The hardware board', 'The USB cable'],
    answerIndex: 1
  },
  {
    id: 1183,
    chapter: 'Question Solving',
    question: 'Which command sets the cursor position on an LCD?',
    options: ['lcd.home()', 'lcd.setCursor(col, row)', 'lcd.move()', 'lcd.print()'],
    answerIndex: 1
  },
  {
    id: 1184,
    chapter: 'Question Solving',
    question: 'Stepper motors are commonly used in:',
    options: ['Ceiling Fans', '3D Printers / CNC Machines', 'Electric Cars', 'Blenders'],
    answerIndex: 1
  },
  {
    id: 1185,
    chapter: 'Question Solving',
    question: 'Home Automation using IoT often uses a _______ to control AC lights.',
    options: ['Relay', 'LED', 'Resistor', 'Buzzer'],
    answerIndex: 0
  }


];






