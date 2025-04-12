const questions = [
  {
    topic: "Networks",
    questions: [
      {
        question: "What does DNS stand for?",
        answer: "Domain Name System",
      },
      {
        question: "What is your physical address called?",
        answer: "MAC Address",
      },
      {
        question: "What is the purpose of ISP (Internet service providers)?",
        answer: "Give internet access",
      },
      {
        question: "What IP address starts with 127?",
        answer: "Localhost",
      },
      {
        question:
          "You’re at your local coffee shop and want to use their public Wi-Fi so you can do your work. What should you use?",
        answer: "Virtual Private Network",
      },
      {
        question: "How is a VPN useful for privacy?",
        answer:
          "Hides the direction of traffic from outsiders; connections are already encrypted",
      },
      {
        question:
          "Traditional firewalls allow packets to be filtered based on ___ or ____ IP",
        answer: "source, destination",
      },
      {
        question:
          "A subnet mask is used to divide an IP address into two parts. One part identifies the __, the other part identifies the ___ to which it belongs",
        answer: "Host Network",
      },
      {
        question: "All devices on Wi-Fi intercept all traffic at what level?",
        answer: "Hardware",
      },
      {
        question:
          "This is a technique that allows secure, anonymous communication over an untrusted network.",
        answer: "Onion Routing",
      },
    ],
  },
  {
    topic: "Encryption and Passwords",
    questions: [
      {
        question: "When a message is encrypted, the text is called:",
        answer: "Ciphertext",
      },
      {
        question:
          "For the one-time pad message technique to be secure the cipher key must be:",
        answer: "Randomly Generated",
      },
      {
        question: "A Vigenère cipher is what kind of substitution:",
        answer: "Polyalphabetic",
      },
      {
        question:
          "When hashing it is impossible to ________ the encrypted output:",
        answer: "Decrypt",
      },
      {
        question:
          "The Output of the String of a hash function is always the same:",
        answer: "Length",
      },
      {
        question:
          "If a hash system makes it hard to find two inputs with the same output then it is:",
        answer: "Collision Resistant",
      },
      {
        question:
          "A password cracking method in which criminals use a list of common passwords put through a hashing algorithm to compare it to hashed passwords stored in a database:",
        answer: "Rainbow Table Attack",
      },
      {
        question:
          "A common tactic used by cyber criminals to trick users into clicking dangerous links usually by impersonating someone else:",
        answer: "Phishing",
      },
      {
        question:
          "If there is a data breach which contained your account information and you reuse passwords across websites then you are vulnerable to a ___________ attack:",
        answer: "Credential Stuffing",
      },
      {
        question: "An encryption type with a public and private key:",
        answer: "Asymmetric",
      },
    ],
  },
  {
    topic: "Threat Modelling",
    questions: [
      {
        question:
          "What is the name of a weakness in a system that attackers can exploit?",
        answer: "Vulnerability",
      },
      {
        question:
          "What type of attack uses manipulation to trick users into giving information?",
        answer: "Social Engineering",
      },
      {
        question:
          "What visual tool is used in threat modelling to map out attack steps?",
        answer: "Attack Tree",
      },
      {
        question:
          "What type of vulnerability results from poor system design or programming errors?",
        answer: "Flaw",
      },
      {
        question:
          "What do we call intended features that can be missed by attackers?",
        answer: "Feature Vulnerabilities",
      },
      {
        question: "What is the first step in creating an attack tree?",
        answer: "Identify Attack Goal",
      },
      {
        question:
          "What type of attack tricks victims using fake emails or messages?",
        answer: "Phishing",
      },
      {
        question:
          "What is the process of identifying and analyzing threats called?",
        answer: "Threat Modelling",
      },
      {
        question:
          "What kind of error might involve using weak passwords or leaving devices unlocked?",
        answer: "User Error",
      },
      {
        question:
          "What term describes the act of entering a building by following someone without authorization?",
        answer: "Tailgating",
      },
    ],
  },
];

export { questions };
