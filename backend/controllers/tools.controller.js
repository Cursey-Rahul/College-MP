import {gemini} from "../index.js"

export const generateMCQs = async (req, res) => {
const {topic ,count ,difficulty} = req.body;

if (!topic || !count || !difficulty) {
    return res.status(400).json({ error: "Topic, count, and difficulty All these fields are required." });
    }
   try{
    const systemInstruction=`
You are an AI quiz generator specialized in academic assessments. 
Your job is to generate high-quality MCQs based on the user's input topic or syllabus.
Maintain educational accuracy and avoid hallucination.
note:- in hard mode also try to keep the questions length medium it can be hard but not too lengthy normal medium length is fine ex around 30-40 words
STRICTLY FOLLOW:-
-firstly analyse the prompt properly if its some kind of study topic  or any kind of thing from which mcqs  can be generated and help in study only then generate mcq otherwise if its look like some chatting type thing not related to the studies or mcq making material then return 0
-if prompt is a "direct question" or nonsense stuff then also return 0

1. You must analyze the topic input:
   - If it is a single topic: generate MCQs directly.
   - If it contains multiple chapters/units/syllabus-level content: 
     identify subtopics and allocate questions evenly.
2. The JSON structure must always follow this exact schema:
{
  "topic": "string",
  "difficulty": "easy | medium | hard",
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A",

    }
  ]
}


example: {
  "topic": "Operating System - Memory Management",
  "difficulty": "medium",
  "questions": [
    {
      "question": "Which memory allocation technique divides memory into fixed size blocks?",
      "options": ["Paging", "Segmentation", "Swapping", "Fragmentation"],
      "correctAnswer": "Paging",
    }
  ]
}

Do not include any text outside JSON. No markdown, no comments.
3. Each question must:
   - Have exactly 4 options
   - Be clear and unambiguous
   - Have only one correct answer
   - Avoid repetitive wording
4. Do NOT number questions or add labels like "1.", "a)" etc.
5. Ensure options are unique and not repeated.
6. If the topic is vague or unclear, make reasonable assumptions based on commonly known academic structure.
7. The response must ALWAYS be valid JSON. No markdown formatting.
`
const contents=`Generate ${count} multiple-choice questions on the topic of ${topic} at a ${difficulty} difficulty level.`

const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
   config:{
    systemInstruction
   }
   })
   console.log("token used:",response.usageMetadata.totalTokenCount);
   if(response.text==="0"){
res.status(200).json({success:false,message: "MCQs cannot be generated from the given input."});
   }else{
     res.status(200).json({success:true,mcqs: JSON.parse(response.text),message: "MCQs generated successfully."});

  }
  
}
   catch (error) {
    console.error("Error generating MCQs:", error);
    res.status(500).json({success:false, message: "Failed to generate MCQs." });
    }
}

export const generateFlashcards = async (req, res) => {
  let contents=`Computer Networks

By Hardeep Singh

 Contents
 Introduction
 Basic Elements of communication systemNetwork

Topologies
 Network types

By Hardeep Singh

Introduction
 A Computer network is a network of computers that

are geographically distributed, but connected in a
manner to enable meaningful transmission and
exchange of data among them.

By Hardeep Singh

Basic Elements of a
Communication System
 Sender: Creates and sends a message

 Medium: Carriers a message
 Receiver: Receives a message

By Hardeep Singh

Example

Medium

Sender

Receiver

Carries a message

Creates and sends
a message

By Hardeep Singh

Receives the message

Data Transmission Modes
SIMPLEX MODE
Sender

Receiver

A Simplex communication system can transmit data in one direction only. Devices
connected to such a circuit wither send(keyboard) only or receive(printer) only.

By Hardeep Singh

Data Transmission modes
HALF DUPLEX
Sender
(Or Receiver)

OR

Receiver
(Or Sender)

A Half Duplex communication system can transmit data in both direction., but in only
one direction at a time. Hence, it can alternately send and receives data. It requires two
wires. it is most suitable for voice communication using telephones in which open
person can speak at a time.

By Hardeep Singh

Data Transmission Modes
FULL DUPLEX
Sender
(Or Receiver)

AND

Receiver
(Or Sender)

This mode requires four wires that allows data to flow in both directions
simultaneously. Modern computer and internet are most popular examples of
this mode. It improves efficiency because it eliminates the direction switching
delay of a half duplex system

By Hardeep Singh

Network Topologies
 Topology of a network refers to the way in which the network’s

nodes(computer or other devices that need to communicate) are
linked together.
 It determines the various data paths available between any pair
of nodes in the network.
 Choice of a topology for a computer network depends on a
combination of factors, such as:
 Desired Performance of the system
 Reliability of the system
 Size(Numbers of nodes and their geographical distribution) of the

system)
 Cost of components and services required to implement network
 Availability of communication lines
By Hardeep Singh

Star Topology

D2

Host
Node

D1

D3

D4

 Multiple Nodes connected to a host node
 Nodes in the network are linked to each other through the host

node and can communicate only via the host node
 Routing function is performed by the host node that centrally
controls communication between any two other nodes by
establishing a logical path between them.
By Hardeep Singh

 Advantages of Star Topology
 Star topology has minimal line cost because only “n-1”
lines are required for connecting “n” nodes.
 Transmission delays between two nodes do not increase
by adding new nodes to network, because any two nodes
are connected via two links only.
 If any node other than the host node fails, remaining
nodes are unaffected
 Disadvantage of Star Topology
 The system crucially depends on the host node. If it
fails, entire network fails.
By Hardeep Singh

Ring Topology

D1

D5

D2

D4

D3

 Each node has two communicating subordinates(adjacent nodes with

which it can communicates directly), but there is no master node for
controlling other nodes
 Node receives data from one of its two adjacent nodes.
 The only decision a node has to take is whether the data is for its own
use.
 If it is addressed to it, utilizes it otherwise it merely passes it to the next
node
By Hardeep Singh

 Advantages of Ring Topology
 There is no central node for making routing decision
 It is more reliable than a star network because
communication is not dependent on a single central node. If a
link between any two nodes fails, or if one of the nodes fails,
alternate routing is possible.

 Disadvantages of Ring Topology
 Communication delay is directly proportional to number of
nodes in the network.
 Addition of new node in a network increase communication
delays
 It requires more complicated controls software than star
topology.
By Hardeep Singh

Completely Connected Network
D1

D2

D5

D4

D3

 Separate physical link for connecting each node to any other node
 Each node has a direct link, called point-to-point link, with all other

nodes in the network
 The control is distributed with each node deciding its communicating
priorities.
By Hardeep Singh

 Advantages of Completely Connected
 It is very reliable because any link failure will affect only
direct communication between nodes connected by that
link
 Each node of the network need not have individual
routing capability
 Communication is very fast between any two nodes.
 Disadvantages of completely connected
 It is the most expensive network from the point of view
of link cost.
 If there are “n” nodes in a network, “n(n-1)/2” links are
required.
By Hardeep Singh

Bus Topology
D1

D2

D3

Single Communication line shared by all nodes

D4

D5

 All nodes share a single transmission medium
 When a node wants to send a message to another node, it appends destination
address to the message and checks whether communication line is free.
 As soon as line become free, it broadcast the messages on the line. As the
message travels on the line, each node check whether the message addressed to
it.
 The message is picked up by addressee node that sends an acknowledgement to
source node and frees the line.
By Hardeep Singh

 Advantages of Bus Topology
 It helps in reducing the number of physical lines
 Failure of a node does not affect communication among
other nodes in the network
 Addition of a new node to the network is easy
 Disadvantages of Bus Topology
 If the shared communication line fails, entire network
fails

By Hardeep Singh

Hybrid Network
D
2
D1

D1
D
1

Host

D
3

D2

D4

D3

D
4

Ring

Star
By Hardeep Singh

D2

D3

Completely Connected

NETWORK TYPE

By Hardeep Singh

Local Area Network (LAN)
 A Local Area Network (LAN) is a computer network covering a small
geographic area, like a home, office, or group of buildings.

 It connects workstations, personal computers, printers, servers and many other
devices.

 LAN uses low speed communication lines for connections like Twisted Pair
Cable, Coaxial Cable and Fiber Optics.

 The cost of sending/receiving data is negligible.
 LAN is owned by a single organization because of its limited area.

By Hardeep Singh

By Hardeep Singh

Metropolitan Area Network
(MAN)
 A Metropolitan Area Network (MAN) is a computer network covering a
town or city.

 MANs are larger LANs in terms of geographic area covered.
 MANs use high speed connections using coaxial cable and microwave links.
 Best example of MAN is Cable Television network in many cities.
 MAN is formed by connections several LANs which may belong to various organizations.
By Hardeep Singh

Metropolitan Area Network
(MAN)

By Hardeep Singh

Wide Area Network (WAN)
 A Wide Area Network (WAN) is a computer network covering a very large
geographic area, like a country or continent.

 WAN uses very high speed communication links like satellite communication,
telephone lines and microwave links.

 The cost of sending data in a WAN may be very high because public
communication systems such as telephone lines, microwave links or satellite
communication are used.

 The largest WAN in existence is the Internet.
By Hardeep Singh

LAN, MAN & WAN

By Hardeep Singh

`
    try {
    const systemInstruction=`
    You are an AI assistant that generates concise, useful flashcards from user-provided content (such as textbook chapters, lecture notes, or PDF text). Your goal is to simplify the material into short, easy-to-remember flashcards optimized for quick revision.
    focus on the important concept and major heading that are relevant or helpful in last minute revision.
Flashcard Content Rules:
-firstly analyse the prompt properly if its some kind of study material  or any kind of thing from which flashcard can be generated only then generate cards otherwise if its look like some chatting type thing not related to the studies or flashcard making material then return 0
-The prompt should only contain the material through which flashcards can be generated otherwise if its some 
direct prompt return 0
-if prompt is a direct question or asking for some non study related thing then also return 0
- Identify only meaningful key points: major concepts, definitions, formulas, facts, and important explanations.
- Avoid duplication, irrelevant text, page numbers, figure references, or formatting descriptions.
- Do NOT repeat long sentences directly unless required for a definition or formula.

Flashcard Structure:
Each flashcard MUST contain exactly:
1) "title" → A short phrase summarizing the concept (3 to 12 words).
2) "description" → A clear explanation of the concept (20 to 60 words).

Output Formatting:
Return the flashcards in clean JSON format as an array of objects:
[
  {
    "title": "Example Concept Title",
    "description": "A short, clear explanation within 20to60 words that captures the essential understanding of the concept."
  }
]
  example output:
  [
  {
    "title": "OSI Model Overview",
    "description": "A conceptual networking framework that divides communication into seven layers. It helps standardize network interactions between systems, enabling interoperability and structured troubleshooting."
  }
]

 note :- Do not include any text outside JSON. No markdown, no comments.and do not put any ''' or '''json around the output just direct json output.

Flashcard Count Logic:
The number of flashcards should depend on the size and density of the input:
- if somehow only topic is given not the conttent them genrerate around 5 to 7 cards according to the topic selfly
- Small input (< 500 words): 4to8 flashcards
- Medium input (500to1500 words): 8to18 flashcards
- Large input (1500to3000 words): 18to35 flashcards
- Extra large input (> 3000 words): first summarize the content, then produce 30to45 flashcards

Maximum Output Rule:
- Do NOT generate more than 45 flashcards under any circumstances.

Tone & Style Guidelines:
- Use simple language and clarity over complexity.
- Avoid long paragraphs, filler sentences, or unnecessary examples.
- Use bullet points only if needed and keep them brief.

If the content is too unclear to form meaningful flashcards, return an empty JSON array.
    `  
const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
   config:{
    systemInstruction
   }
   })
   console.log("token used:",response.usageMetadata.totalTokenCount);
   if(response.text==="0"){
res.status(200).json({success:false, message: "flashcards cannot be generated from the given input."});
   }else{

     res.status(200).json({success:true, flashcards: JSON.parse(response.text),message: "fc's generated successfully."});
  }

    } catch(error) {
      console.error("Error generating flashcards:", error);
      res.status(500).json({success:false,  message: "Failed to generate flashcards." });
    }
  
  }

export const summarizeText = async (req, res) => {
 let contents=`

				
					

	
		
		Unit -1 Introduction of DBMS	

	
	
		
What is DataData is nothing but facts and statistics stored or free flowing over a network, generally it’s raw and unprocessed. For example: When you visit any website, they might store you IP address, that is data, in return they might add a cookie in your browser, marking you that you visited the website, that is data, your name, it’s data, your age, it’s data.Data becomes information when it is processed, turning it into something meaningful. Like, based on the cookie data saved on user’s browser, if a website can analyse that generally men of age 20-25 visit us more, that is information, derived from the data collected.



What is a Database-A Database is a collection of related data organised in a way that data can be easily accessed, managed and updated. Database can be software based or hardware based, with one sole purpose, storing data.During early computer days, data was collected and stored on tapes, which were mostly write-only, which means once data is stored on it, it can never be read again. They were slow and bulky, and soon computer scientists realised that they needed a better solution to this problem.Larry Ellison, the co-founder of Oracle was amongst the first few, who realised the need for a software based Database Management System



What is DBMS



A DBMS is a software that allows creation, definition and manipulation of database, allowing users to store, process and analyse data easily. DBMS provides us with an interface or a tool, to perform various operations like creating database, storing data in it, updating data, creating tables in the database and a lot more.



DBMS also provides protection and security to the databases. It also maintains data consistency in case of multiple users.



Here are some examples of popular DBMS used these days:



MySqlOracleSQL ServerIBM DB2PostgreSQLAmazon SimpleDB (cloud based) etc.



Characteristics of Database Management System



A database management system has following characteristics:



Data stored into Tables: Data is never directly stored into the database. Data is stored into tables, created inside the database. DBMS also allows to have relationships between tables which makes the data more meaningful and connected. You can easily understand what type of data is stored where by looking at all the tables created in a database.Reduced Redundancy: In the modern world hard drives are very cheap, but earlier when hard drives were too expensive, unnecessary repetition of data in database was a big problem. But DBMS follows Normalisation which divides the data in such a way that repetition is minimum.Data Consistency: On Live data, i.e. data that is being continuosly updated and added, maintaining the consistency of data can become a challenge. But DBMS handles it all by itself.Support Multiple user and Concurrent Access: DBMS allows multiple users to work on it(update, insert, delete data) at the same time and still manages to maintain the data consistency.Query Language: DBMS provides users with a simple Query language, using which data can be easily fetched, inserted, deleted and updated in a database.Security: The DBMS also takes care of the security of data, protecting the data from un-authorised access. In a typical DBMS, we can create user accounts with different access permissions, using which we can easily secure our data by restricting user access.DBMS supports transactions, which allows us to better handle and manage data integrity in real world applications where multi-threading is extensively used.



Advantages of DBMS



Segregation of applicaion program.Minimal data duplicacy or data redundancy.Easy retrieval of data using the Query Language.Reduced development time and maintainance need.With Cloud Datacenters, we now have Database Management Systems capable of storing almost infinite data.Seamless integration into the application programming languages which makes it very easier to add a database to almost any application or website.







Disadvantages of DBMS



It’s ComplexityExcept MySQL, which is open source, licensed DBMSs are generally costly.They are large in size.



History of DBMS



Here, are the important landmarks from the history:1960 – Charles Bachman designed first DBMS system1970 – Codd introduced IBM’S Information Management System (IMS)1976- Peter Chen coined and defined the Entity-relationship model also know as the ER model1980 – Relational Model becomes a widely accepted database component1985- Object-oriented DBMS develops.1990s- Incorporation of object-orientation in relational DBMS.1991- Microsoft ships MS access, a personal DBMS and that displaces all other personal DBMS products.1995: First Internet database applications1997: XML applied to database processing. Many vendors begin to integrate XML into DBMS products.







Users: Users may be of any kind such as DB administrator, System developer, or database users.



Database application: Database application may be Departmental, Personal, organization’s and / or Internal.



DBMS: Software that allows users to create and manipulate database access,
Database: Collection of logical data as a single unit.
What is a Database Model
A database model shows the logical structure of a database, including the relationships and constraints that determine how data can be stored and accessed. Individual database models are designed based on the rules and concepts of whichever broader data model the designers adopt. Most data models can be represented by an accompanying database diagram.
Types of database models
There are many kinds of data models. Some of the most common ones include:
Hierarchical database modelRelational modelNetwork modelObject-oriented database modelEntity-relationship modelDocument modelEntity-attribute-value modelStar schemaThe object-relational model, which combines the two that make up its name
Relational model
The most common model, the relational model sorts data into tables, also known as relations, each of which consists of columns and rows. Each column lists an attribute of the entity in question, such as price, zip code, or birth date. Together, the attributes in a relation are called a domain. A particular attribute or combination of attributes is chosen as a primary key that can be referred to in other tables, when it’s called a foreign key.
Each row, also called a tuple, includes data about a specific instance of the entity in question, such as a particular employee.
The model also accounts for the types of relationships between those tables, including one-to-one, one-to-many, and many-to-many relationships. Here’s an example:
Hierarchical model
The hierarchical model organizes data into a tree-like structure, where each record has a single parent or root. Sibling records are sorted in a particular order. That order is used as the physical order for storing the database. This model is good for describing many real-world relationships.







This model was primarily used by IBM’s Information Management Systems in the 60s and 70s, but they are rarely seen today due to certain operational inefficiencies.



Network model



The network model builds on the hierarchical model by allowing many-to-many relationships between linked records, implying multiple parent records. Based on mathematical set theory, the model is constructed with sets of related records. Each set consists of one owner or parent record and one or more member or child records. A record can be a member or child in multiple sets, allowing this model to convey complex relationships.



It was most popular in the 70s after it was formally defined by the Conference on Data Systems Languages (CODASYL).







Object-oriented database model



This model defines a database as a collection of objects, or reusable software elements, with associated features and methods. There are several kinds of object-oriented databases:



A multimedia database incorporates media, such as images, that could not be stored in a relational database.



A hypertext database allows any object to link to any other object. It’s useful for organizing lots of disparate data, but it’s not ideal for numerical analysis.



The object-oriented database model is the best known post-relational database model, since it incorporates tables, but isn’t limited to tables. Such models are also known as hybrid database models.







Entity-relationship model



This model captures the relationships between real-world entities much like the network model, but it isn’t as directly tied to the physical structure of the database. Instead, it’s often used for designing a database conceptually.



Here, the people, places, and things about which data points are stored are referred to as entities, each of which has certain attributes that together make up their domain. The cardinality, or relationships between entities, are mapped as well.







A common form of the ER diagram is the star schema, in which a central fact table connects to multiple dimensional tables.



What is Data Independence



Data Independence is defined as a property of DBMS that helps you to change the Database schema at one level of a database system without requiring to change the schema at the next higher level. Data independence helps you to keep data separated from all programs that make use of it.



You can use this stored data for computing and presentation. In many systems, data independence is an essential function for components of the system.



Types of Data Independence



In DBMS there are two types of data independencenull



Physical data independenceLogical data independence.



Physical Data Independence



Physical data independence helps you to separate conceptual levels from the internal/physical levels. It allows you to provide a logical description of the database without the need to specify physical structures. Compared to Logical Independence, it is easy to achieve physical data independence.



With Physical independence, you can easily change the physical storage structures or devices with an effect on the conceptual schema. Any change done would be absorbed by the mapping between the conceptual and internal levels. Physical data independence is achieved by the presence of the internal level of the database and then the transformation from the conceptual level of the database to the internal level.



Examples of changes under Physical Data Independence



Due to Physical independence, any of the below change will not affect the conceptual layer.



Using a new storage device like Hard Drive or Magnetic TapesModifying the file organization technique in the DatabaseSwitching to different data structures.Changing the access method.Modifying indexes.Changes to compression techniques or hashing algorithms.Change of Location of Database from say C drive to D Drive



Logical Data Independence



Logical Data Independence is the ability to change the conceptual scheme without changing



External viewsExternal API or programs



Any change made will be absorbed by the mapping between external and conceptual levels.



When compared to Physical Data independence, it is challenging to achieve logical data independence.



Examples of changes under Logical Data Independence



Due to Logical independence, any of the below change will not affect the external layer.



Add/Modify/Delete a new attribute, entity or relationship is possible without a rewrite of existing application programsMerging two records into oneBreaking an existing record into two or more records



Difference between Physical and Logical Data Independence











Database Architecture



A Database Architecture is a representation of DBMS design. It helps to design, develop, implement, and maintain the database management system. A DBMS architecture allows dividing the database system into individual components that can be independently modified, changed, replaced, and altered. It also helps to understand the components of a database.



A Database stores critical information and helps access data quickly and securely. Therefore, selecting the correct Architecture of DBMS helps in easy and efficient data management.



Types of DBMS Architecture



There are mainly three types of DBMS architecture:



One Tier Architecture (Single Tier Architecture)Two Tier ArchitectureThree Tier Architecture







Now, we will learn about different architecture of DBMS with diagram.null



1-Tier Architecture



1 Tier Architecture in DBMS is the simplest architecture of Database in which the client, server, and Database all reside on the same machine. A simple one tier architecture example would be anytime you install a Database in your system and access it to practice SQL queries. But such architecture is rarely used in production.



2-Tier Architecture







A 2 Tier Architecture in DBMS is a Database architecture where the presentation layer runs on a client (PC, Mobile, Tablet, etc.), and data is stored on a server called the second tier. Two tier architecture provides added security to the DBMS as it is not exposed to the end-user directly. It also provides direct and faster communication.



In the above 2 Tier client-server architecture of database management system, we can see that one server is connected with clients 1, 2, and 3.



Two Tier Architecture Example:



A Contact Management System created using MS- Access.



3-Tier Architecture



A 3 Tier Architecture in DBMS is the most popular client server architecture in DBMS in which the development and maintenance of functional processes, logic, data access, data storage, and user interface is done independently as separate modules. Three Tier architecture contains a presentation layer, an application layer, and a database server.



3-Tier database Architecture design is an extension of the 2-tier client-server architecture. A 3-tier architecture has the following layers:null



Presentation layer (your PC, Tablet, Mobile, etc.)Application layer (server)Database Server







The Application layer resides between the user and the DBMS, which is responsible for communicating the user’s request to the DBMS system and send the response from the DBMS to the user. The application layer(business logic layer) also processes functional logic, constraint, and rules before passing data to the user or down to the DBMS.



Three schema Architecture



The three schema architecture is also called ANSI/SPARC architecture or three-level architecture.This framework is used to describe the structure of a specific database system.The three schema architecture is also used to separate the user applications and physical database.The three schema architecture contains three-levels. It breaks the database down into three different categories.



The three-schema architecture is as follows:







In the above diagram:



It shows the DBMS architecture.Mapping is used to transform the request and response between various database levels of architecture.Mapping is not good for small DBMS because it takes more time.In External / Conceptual mapping, it is necessary to transform the request from external level to conceptual schema.In Conceptual / Internal mapping, DBMS transform the request from the conceptual to internal level.



1. Internal Level



The internal level has an internal schema which describes the physical storage structure of the database.The internal schema is also known as a physical schema.It uses the physical data model. It is used to define that how the data will be stored in a block.The physical level is used to describe complex low-level data structures in detail.



2. Conceptual Level



The conceptual schema describes the design of a database at the conceptual level. Conceptual level is also known as logical level.The conceptual schema describes the structure of the whole database.The conceptual level describes what data are to be stored in the database and also describes what relationship exists among those data.In the conceptual level, internal details such as an implementation of the data structure are hidden.Programmers and database administrators work at this level.



3. External Level



At the external level, a database contains several schemas that sometimes called as subschema. The subschema is used to describe the different view of the database.An external schema is also known as view schema.Each view schema describes the database part that a particular user group is interested and hides the remaining database from that user group.The view schema describes the end user interaction with database systems.
			
`

    try {
    const systemInstruction=`
   You are an AI assistant that summarizes long content such as PDF text, textbook paragraphs, articles, or lecture notes into a clear, structured study summary.


-firstly analyse the prompt or the content properly if its somehting that is related to any kind of study material only then that can relate to studies or a prompt which summary can be generated  onlt then generate summary otherwise if its look like some chatting type thingnor somw question answer type shii then return 0

Your output MUST follow these rules:

1. Output ONLY valid HTML inside a single <div> element. Do NOT include <html>, <head>, or <body> tags.
2. Use clean semantic structure such as: <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, or <em>.
3. The format of the content should feel like structured notes—not a casual paragraph.
4. use can also use basic inline styling and tags like <strong> and <em> to highlight key terms or concepts.
5. avoid complex css or styling keep it basic familiar to a basic notes pdf 
6. also always thing of the layout of the content it should not breake when the html is rendered thats wht you have to use basic tags only use some css omre than described if needed otherwise its ok .

 HTML Formatting Rules:
   -ONly and only Allowed tags: <h1>, <h2>, <h3>, <h4>, <p>, <ul>, <ol>, <li>, <strong>, <em>,<br>, <span>, <div>, and <code>.
   -dont use any <a> tag or any kind of link tag
   -use of <pre> tag for anything is also prohibited use only and only allowed tags given above
   -For giving the examples such as writing <h1> or <p> use &lt;h1&gt; or &lt;p&gt; to represent them do not use actual tags
   - You may use simple inline CSS only in the **style="" attribute** and ONLY for readability (e.g., margin, padding, font-size, line-height, bold). Do NOT use complex styling, animations, flex, grids, scrolling behavior, overflow rules, absolute positioning, or layouts that may break PDF formatting.
   - All text must wrap naturally its the most important thing to convert it to the pdf no overflow-auto can be given of any kind. No element should be wide enough to require horizontal scrolling.

Content Guidelines:
- First, create a short introduction summary (2 to 5 sentences).
- Then provide a structured breakdown using section headers and bullet points.
- Highlight key concepts, formulas, definitions, or important facts using <strong>.
- Keep wording concise and student-friendly.
- Avoid overly technical phrasing unless necessary.
- Do NOT repeat exact long text from the input. Rewrite in your own words.
- If the input is unclear or incomplete, infer logically but avoid fabricating detailed facts.

Length Logic:
you have to decide the length and the sections of the summary autonomously divide the content into meaningful sections and key points try to all all the important topics and give their summary accordingly 
note:- try not to make summary very short always try to cover all the topics in brief
IMPORTANT NOTE:- one more very important thing dont be afraid to generate long summary if the content is provided is long because summary is all about covering all the important points in brief if the content is long then summary will also be long thats ok but try to keep it concise as much as possible sp you just have to cover all the things but in brief

Output Format Example:

<div>
  <h2>Summary</h2>
  <p>Short paragraph summarizing the content.</p>

  <h3>Key Concepts</h3>
  <ul>
    <li><strong>Term:</strong> Short explanation.</li>
    <li>Another key idea in short form.</li>
  </ul>

  <h3>Important Points</h3>
  <ul>
    <li>Bullet with meaningful information.</li>
    <li>Another important detail.</li>
  </ul>
</div>

Final Rules:
- Return ONLY the HTML. No markdown, no comments, no explanations.
- Do not include phrases like "Here is the summary:".
- there should not be a single word rahter than the html in the output
    `  
const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
   config:{
    systemInstruction
   }
   })
   console.log("token used:",response.usageMetadata.totalTokenCount);
   if(response.text==="0"){
res.status(200).json({success:false, message: "summary cannot be generated from the given input."});
   }else{
     res.status(200).json({success:true, summary:response.text,message: "summary generated successfully."});

  }

    } catch(error) {
      console.error("Error generating summary:", error);
      res.status(500).json({success:false,  message: "Failed to generate summary." });
    }
  
}


export const generateNotes = async (req, res) => {
//  let contents=`
// UNIT-IV
// HTML: use of commenting, headers, text styling, images, formatting text with <FONT>, special
// characters, horizontal rules, line breaks, table, forms, image maps, <META> tags,
// <FRAMESET> tags, file formats including image formats.
//   `
let contents=`hows weather today.`
    try {
    const systemInstruction=`You are an AI notes generator that creates extremely detailed and exhaustive study notes based on a provided topic, syllabus, or unit. The output must be structured in clean, semantic HTML suitable for direct rendering and safe conversion into a PDF without any layout breaking.

--------------------
CORE RULES (Follow Strictly):

-firstly analyse the prompt properly if its some syllabus or any kind of topic that can relate to studies only then generate notes otherwise if its look like some chatting type thing or direct ques  then return 0


1. Output ONLY valid HTML wrapped inside one single parent tag:
   <div id="notes"> ... </div>
   - Do NOT include <html>, <head>, <body>, markdown, or external comments.
   - Never include scrollable elements, tables that overflow, or layouts requiring horizontal scrolling.

2. HTML Formatting Rules:
   -ONly and only Allowed tags: <h1>, <h2>, <h3>, <h4>, <p>, <ul>, <ol>, <li>, <strong>, <em>,<br>, <span>, <div>, and <code>.
   -dont use any <a> tag or any kind of link tag
   -use of <pre> tag for anything is also prohibited use only and only allowed tags given above
   -For giving the examples such as writing <h1> or <p> use &lt;h1&gt; or &lt;p&gt; to represent them do not use actual tags
   - You may use simple inline CSS only in the **style="" attribute** and ONLY for readability (e.g., margin, padding, font-size, line-height, bold). Do NOT use complex styling, animations, flex, grids, scrolling behavior, overflow rules, absolute positioning, or layouts that may break PDF formatting.
   - All text must wrap naturally its the most important thing to convert it to the pdf no overflow-auto can be given of any kind. No element should be wide enough to require horizontal scrolling.

3. Content Requirements:
   - Begin with a proper title using <h1>.
   - If the input is a small topic, break it into logical subtopics automatically.
   - If the input is a full syllabus, generate sections and subsections accordingly.
   - For every topic or subtopic, include:
        • Definition or overview  
        • Key concepts and terminology  
        • Important formulas 
        • Examples (optional but preferred)  
        • Common mistakes or misconceptions  
        • Short practice questions (2–4) with brief answers or hints  

4. Language and Depth:
   - Notes must be extremely detailed, thorough, and easy to understand.
   - Use clear educational tone suitable for undergraduate or exam preparation.
   - Do NOT leave major subtopics unexplained.
   - Use token budget wisely: detail is priority, but if the input is very large, summarize less relevant topics briefly while retaining depth for core topics.

5. Output Behavior:
   - No disclaimers, no placeholder text, no model commentary.
   - The output must be final-use ready and not require formatting fixes.
   - Every response should look like a fully formatted document a student can download as a PDF.

--------------------
STRUCTURE REFERENCE (Follow style, not wording):

<div id="notes">
  <h1>Topic Title</h1>
  <nav>
    <ul>
      <li>1. Subtopic One</li>
      <li>2. Subtopic Two</li>
    </ul>
  </nav>

  <h2>1. Subtopic One</h2>
  <p>Explanation...</p>

  <h3>1.1 Concept</h3>
  <p>Details...</p>
  <pre>Formula or code</pre>

  <p><strong>Example:</strong> Small worked example.</p>
  <p><strong>Practice Questions:</strong></p>
  <ul>
    <li>Q1 ... (hint)</li>
  </ul>
</div>
`

const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
   config:{
    systemInstruction
   }
   })
   console.log("token used:",response.usageMetadata.totalTokenCount);
if(response.text==="0"){
res.status(200).json({success:false, message: "Notes cannot be generated from the given input."});
   }else{
     res.status(200).json({success:true, notes:response.text,message: "notes generated successfully."});

  }

    } catch(error) {
      console.error("Error generating summary:", error);
      res.status(500).json({ success:false, message: "Failed to generate notes." });
    }
}





















