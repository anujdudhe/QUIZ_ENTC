export const unit4Questions = [
 
  {
    id: 400,
    chapter: "UNIT 4",
    question: "Which pin mode is required to control an LED?",
    options: [
      "INPUT",
      "OUTPUT",
      "ANALOG",
      "PWM"
    ],
    answerIndex: 1
  },
  {
    id: 401,
    chapter: "UNIT 4",
    question: "Which function is used to turn ON an LED?",
    options: [
      "turnOn()",
      "light()",
      "digitalWrite(pin, HIGH)",
      "pinHigh(pin)"
    ],
    answerIndex: 2
  },
  {
    id: 402,
    chapter: "UNIT 4",
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
    id: 403,
    chapter: "UNIT 4",
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
    id: 404,
    chapter: "UNIT 4",
    question: "Which pin mode is used to read a switch input?",
    options: [
      "OUTPUT",
      "INPUT",
      "ANALOG",
      "PWM"
    ],
    answerIndex: 1
  },
  {
    id: 405,
    chapter: "UNIT 4",
    question: "Which function reads the state of a switch?",
    options: [
      "readPin()",
      "analogRead()",
      "digitalRead()",
      "switchRead()"
    ],
    answerIndex: 2
  },
  {
    id: 406,
    chapter: "UNIT 4",
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
    id: 407,
    chapter: "UNIT 4",
    question: "If an LED connected to pin 9 glows dim, the reason may be:",
    options: [
      "Pin is in INPUT mode",
      "Poor wiring",
      "Incorrect resistor value",
      "All of the above"
    ],
    answerIndex: 3
  },
  {
    id: 408,
    chapter: "UNIT 4",
    question: "Why should a relay be driven through a transistor/module instead of directly from Arduino?",
    options: [
      "Arduino pins supply high current",
      "Relays work at low current",
      "Arduino cannot supply enough current for relay coil",
      "Relay does not need isolation"
    ],
    answerIndex: 2
  },
  {
    id: 409,
    chapter: "UNIT 4",
    question: "If a relay is OFF and load should remain disconnected, which terminal is used?",
    options: [
      "NC",
      "COM only",
      "NO",
      "Both NC and NO"
    ],
    answerIndex: 2
  },
  {
    id: 410,
    chapter: "UNIT 4",
    question: "What is the purpose of a pull-up resistor with a switch?",
    options: [
      "Reduce voltage",
      "Avoid floating input",
      "Increase current",
      "Delay switching"
    ],
    answerIndex: 1
  },
  {
    id: 411,
    chapter: "UNIT 4",
    question: "If digitalRead() gives random HIGH/LOW values, the cause is:",
    options: [
      "Short circuit",
      "Pull-up/pull-down not used",
      "Wrong board selection",
      "Power issue"
    ],
    answerIndex: 1
  },
  {
    id: 412,
    chapter: "UNIT 4",
    question: "What is the output of blinking LED code with 500 ms delay?",
    options: [
      "LED stays OFF",
      "LED stays ON",
      "LED blinks every 1 second",
      "LED blinks every 0.5 second"
    ],
    answerIndex: 3
  },
  {
    id: 413,
    chapter: "UNIT 4",
    question: "If a relay module is active LOW, what happens when digitalWrite(pin, LOW) is used?",
    options: [
      "Relay OFF",
      "Relay ON",
      "Board resets",
      "Relay damaged"
    ],
    answerIndex: 1
  },
  {
    id: 414,
    chapter: "UNIT 4",
    question: "Controlling a bulb using a relay depends on:",
    options: [
      "Always HIGH logic",
      "Always LOW logic",
      "Relay type (active HIGH/LOW)",
      "Bulb rating"
    ],
    answerIndex: 2
  },
  {
    id: 415,
    chapter: "UNIT 4",
    question: "What does this code do? If switch HIGH → LED HIGH",
    options: [
      "LED turns ON when switch pressed",
      "LED blinks",
      "LED turns OFF when pressed",
      "LED random"
    ],
    answerIndex: 0
  },
  {
    id: 416,
    chapter: "UNIT 4",
    question: "What happens when INPUT_PULLUP is used?",
    options: [
      "Pin floats",
      "Pin reads HIGH when switch not pressed",
      "Pin reads LOW when not pressed",
      "Pin becomes OUTPUT"
    ],
    answerIndex: 1
  },
  {
    id: 417,
    chapter: "UNIT 4",
    question: "With INPUT_PULLUP, relay turns ON when:",
    options: [
      "Switch pressed",
      "Switch not pressed",
      "Relay blinks",
      "Relay OFF always"
    ],
    answerIndex: 0
  },
  {
    id: 418,
    chapter: "UNIT 4",
    question: "To toggle a relay on each button press, what is required?",
    options: [
      "delay()",
      "digitalWrite() only",
      "State-change (debounce) logic",
      "INPUT pin mode"
    ],
    answerIndex: 2
  },
  {
    id: 419,
    chapter: "UNIT 4",
    question: "If a switch is connected without ground reference, Arduino reads:",
    options: [
      "Correct values",
      "Constant HIGH",
      "Random values",
      "Program crashes"
    ],
    answerIndex: 2
  },

  {
    id: 420,
    chapter: "UNIT 4",
    question: "How many segments are present in a standard seven-segment display excluding the decimal point?",
    options: [
      "5",
      "6",
      "7",
      "8"
    ],
    answerIndex: 2
  },
  {
    id: 421,
    chapter: "UNIT 4",
    question: "In a common-cathode seven-segment display, which segment lights up when driven HIGH?",
    options: [
      "Common terminal",
      "None",
      "The specific segment",
      "All segments"
    ],
    answerIndex: 2
  },
  {
    id: 422,
    chapter: "UNIT 4",
    question: "Which Arduino function is used to set a pin as output?",
    options: [
      "setPin()",
      "pinMode()",
      "mode()",
      "analogMode()"
    ],
    answerIndex: 1
  },
  {
    id: 423,
    chapter: "UNIT 4",
    question: "Which library is required to interface a 16×2 LCD with Arduino?",
    options: [
      "LCD.h",
      "Serial.h",
      "LiquidCrystal.h",
      "Lcd1602.h"
    ],
    answerIndex: 2
  },
  {
    id: 424,
    chapter: "UNIT 4",
    question: "How many characters are available in one row of a 16×2 LCD?",
    options: [
      "8",
      "10",
      "12",
      "16"
    ],
    answerIndex: 3
  },
  {
    id: 425,
    chapter: "UNIT 4",
    question: "Which Arduino function sends data or characters to an LCD?",
    options: [
      "lcd.write()",
      "lcd.send()",
      "lcd.print()",
      "lcd.char()"
    ],
    answerIndex: 2
  },
  {
    id: 426,
    chapter: "UNIT 4",
    question: "Why are current-limiting resistors used for seven-segment LEDs?",
    options: [
      "Increase brightness",
      "Prevent excessive current damage",
      "Power Arduino",
      "Reduce relay voltage"
    ],
    answerIndex: 1
  },
  {
    id: 427,
    chapter: "UNIT 4",
    question: "In a common-anode seven-segment display, segments glow when:",
    options: [
      "Segment pins are LOW",
      "Segment pins are HIGH",
      "All pins are disconnected",
      "Arduino resets"
    ],
    answerIndex: 0
  },
  {
    id: 428,
    chapter: "UNIT 4",
    question: "What does lcd.begin(16, 2) do?",
    options: [
      "Clears LCD",
      "Sets cursor home",
      "Initializes LCD with 16 columns and 2 rows",
      "Positions LCD on breadboard"
    ],
    answerIndex: 2
  },
  {
    id: 429,
    chapter: "UNIT 4",
    question: "Why must RS, E, D4–D7 pins be specified while creating LCD object?",
    options: [
      "Identify LCD brand",
      "Tell Arduino which pins control LCD",
      "Set brightness",
      "Reset LCD"
    ],
    answerIndex: 1
  },
  {
    id: 430,
    chapter: "UNIT 4",
    question: "If characters appear garbled on LCD, the main cause is:",
    options: [
      "Wrong contrast (V0) setting",
      "Wrong font",
      "Wrong power supply",
      "Too many delays"
    ],
    answerIndex: 0
  },
  {
    id: 431,
    chapter: "UNIT 4",
    question: "Which digit is displayed when segments a–f are HIGH and g is LOW?",
    options: [
      "8",
      "0",
      "1",
      "6"
    ],
    answerIndex: 1
  },
  {
    id: 432,
    chapter: "UNIT 4",
    question: "If a common-cathode display shows all segments OFF, the likely cause is:",
    options: [
      "Cathode not connected to GND",
      "Wrong resistor",
      "Analog pin usage",
      "Excess brightness"
    ],
    answerIndex: 0
  },
  {
    id: 433,
    chapter: "UNIT 4",
    question: "If only segments b and c are ON, which digit is displayed?",
    options: [
      "1",
      "7",
      "0",
      "Nothing"
    ],
    answerIndex: 0
  },
  {
    id: 434,
    chapter: "UNIT 4",
    question: "What will the LCD show if \"Hello\" is printed on row 1 and \"Arduino\" on row 2?",
    options: [
      "Only Hello",
      "Only Arduino",
      "Hello on line 1 and Arduino on line 2",
      "Garbage characters"
    ],
    answerIndex: 2
  },
  {
    id: 435,
    chapter: "UNIT 4",
    question: "What happens after executing lcd.clear(); lcd.print(\"LCD Test\"); delay(2000); lcd.clear();?",
    options: [
      "Prints continuously",
      "Prints for 2 seconds then clears",
      "LCD stays blank",
      "Random characters"
    ],
    answerIndex: 1
  },
  {
    id: 436,
    chapter: "UNIT 4",
    question: "Which LiquidCrystal object creation is correct for RS→7, E→6, D4–D7→5,4,3,2?",
    options: [
      "LiquidCrystal lcd(7,6,5,4,3,2);",
      "LiquidCrystal lcd(6,7,2,3,4,5);",
      "LiquidCrystal lcd(5,4,3,2,7,6);",
      "LiquidCrystal lcd(7,6);"
    ],
    answerIndex: 0
  },
  {
    id: 437,
    chapter: "UNIT 4",
    question: "What will lcd.print(\"1234567890123456\") show on a 16×2 LCD?",
    options: [
      "Overflow",
      "Line 1 full with numbers",
      "Nothing",
      "Random output"
    ],
    answerIndex: 1
  },
  {
    id: 438,
    chapter: "UNIT 4",
    question: "To display the same number on seven-segment and LCD, what is required?",
    options: [
      "analogRead()",
      "Use same variable for both",
      "Only lcd.print()",
      "Remove resistors"
    ],
    answerIndex: 1
  },
  {
    id: 439,
    chapter: "UNIT 4",
    question: "If seven-segment works but LCD shows no output, the most likely issue is:",
    options: [
      "Incorrect LCD contrast (V0)",
      "Wrong board",
      "Wrong delay",
      "Too many segments powered"
    ],
    answerIndex: 0
  },

  
];
