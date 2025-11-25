import React, { useEffect, useState } from "react";
import { FaBookOpen, FaMagic, FaRegLightbulb } from "react-icons/fa";


const API_ENDPOINT = "http://localhost:5000/api/summary"; // <-- change if needed

// Minimal dummy summary (HTML string) used as fallback
const DUMMY_SUMMARY = "<div>\n  <h2>Introduction to Database Management System (DBMS)</h2>\n  <p>\n    This unit introduces the fundamental concepts of Data, Database, and Database Management Systems (DBMS). It covers the evolution from raw data to meaningful information, the structured storage of data in databases, and the software (DBMS) that facilitates its management, access, and security. Understanding these concepts is crucial for managing and interacting with digital information effectively.\n  </p>\n\n  <h3>What is Data?</h3>\n  <ul>\n    <li><strong>Data:</strong> Raw, unprocessed facts and statistics, either stored or transmitted.\n      <ul>\n        <li><em>Example:</em> IP address, cookies, name, age.</li>\n      </ul>\n    </li>\n    <li><strong>Information:</strong> Data that has been processed and organized, making it meaningful and useful.\n      <ul>\n        <li><em>Example:</em> Analyzing cookie data to determine visitor demographics (e.g., men aged 20-25 visit more).</li>\n      </ul>\n    </li>\n  </ul>\n\n  <h3>What is a Database?</h3>\n  <ul>\n    <li>A <strong>Database</strong> is an organized collection of related data, designed for easy access, management, and updating.</li>\n    <li>Can be software or hardware-based, primarily for data storage.</li>\n    <li>Historically, data was stored on slow, bulky, write-only tapes, leading to the need for better solutions.</li>\n    <li>Larry Ellison (Oracle co-founder) was a pioneer in developing software-based Database Management Systems.</li>\n  </ul>\n\n  <h3>What is DBMS?</h3>\n  <ul>\n    <li>A <strong>Database Management System (DBMS):</strong> Software that enables the creation, definition, and manipulation of databases.</li>\n    <li>Provides an interface or tool for operations like creating databases, storing, updating, and analyzing data, and managing tables.</li>\n    <li>Offers protection and security for databases and maintains data consistency, especially with multiple users.</li>\n    <li><em>Examples:</em> MySQL, Oracle, SQL Server, IBM DB2, PostgreSQL, Amazon SimpleDB.</li>\n  </ul>\n\n  <h3>Characteristics of DBMS</h3>\n  <ul>\n    <li><strong>Data Stored in Tables:</strong> Data is organized into tables within the database, with relationships between tables for meaningful connections.</li>\n    <li><strong>Reduced Redundancy:</strong> DBMS uses <strong>Normalisation</strong> to minimize data repetition, saving storage space.</li>\n    <li><strong>Data Consistency:</strong> Manages and maintains the accuracy and validity of data, even with continuous updates.</li>\n    <li><strong>Support Multiple User and Concurrent Access:</strong> Allows multiple users to perform operations (update, insert, delete) simultaneously while maintaining consistency.</li>\n    <li><strong>Query Language:</strong> Provides a simple language (e.g., SQL) for easy data manipulation (fetch, insert, delete, update).</li>\n    <li><strong>Security:</strong> Protects data from unauthorized access by creating user accounts with different permissions.</li>\n    <li><strong>Transactions Support:</strong> Manages data integrity in applications requiring multi-threading.</li>\n  </ul>\n\n  <h3>Advantages of DBMS</h3>\n  <ul>\n    <li>Segregation of application programs.</li>\n    <li>Minimal data duplication or redundancy.</li>\n    <li>Easy data retrieval using query languages.</li>\n    <li>Reduced development time and maintenance needs.</li>\n    <li>Capability to store vast amounts of data (especially with cloud data centers).</li>\n    <li>Seamless integration with application programming languages.</li>\n  </ul>\n\n  <h3>Disadvantages of DBMS</h3>\n  <ul>\n    <li>Complexity in setup and management.</li>\n    <li>Costly for licensed versions (MySQL is an exception as open-source).</li>\n    <li>Large in size, requiring significant system resources.</li>\n  </ul>\n\n  <h3>History of DBMS Milestones</h3>\n  <ul>\n    <li><strong>1960:</strong> Charles Bachman designed the first DBMS.</li>\n    <li><strong>1970:</strong> Codd introduced IBM’s Information Management System (IMS).</li>\n    <li><strong>1976:</strong> Peter Chen defined the <strong>Entity-Relationship (ER) model</strong>.</li>\n    <li><strong>1980:</strong> Relational Model became widely accepted.</li>\n    <li><strong>1985:</strong> Object-oriented DBMS developed.</li>\n    <li><strong>1990s:</strong> Object-orientation incorporated into relational DBMS.</li>\n    <li><strong>1991:</strong> Microsoft shipped MS Access, dominating personal DBMS.</li>\n    <li><strong>1995:</strong> First Internet database applications emerged.</li>\n    <li><strong>1997:</strong> XML applied to database processing, leading to integration into DBMS products.</li>\n  </ul>\n\n  <h3>Database Model</h3>\n  <ul>\n    <li>A <strong>Database Model</strong> illustrates the logical structure of a database, including relationships and constraints for data storage and access.</li>\n    <li>Models are based on broader data model rules and concepts, often represented by a database diagram.</li>\n  </ul>\n\n  <h3>Types of Database Models</h3>\n  <ul>\n    <li><strong>Relational Model (Most Common):</strong>\n      <ul>\n        <li>Sorts data into <strong>tables</strong> (relations), composed of columns and rows.</li>\n        <li>Each column represents an <strong>attribute</strong> (e.g., price, zip code).</li>\n        <li>A <strong>primary key</strong> (unique identifier) is chosen, which can be a <strong>foreign key</strong> in other tables to establish relationships.</li>\n        <li>Each row (tuple) contains data for a specific instance of the entity.</li>\n        <li>Accounts for relationships like one-to-one, one-to-many, and many-to-many.</li>\n      </ul>\n    </li>\n    <li><strong>Hierarchical Model:</strong>\n      <ul>\n        <li>Organizes data in a tree-like structure with a single parent or root for each record.</li>\n        <li>Sibling records are sorted, defining the physical storage order.</li>\n        <li>Good for describing real-world \"one-to-many\" relationships.</li>\n        <li>Primarily used by IBM’s IMS in the 60s and 70s, rarely seen today due to inefficiencies.</li>\n      </ul>\n    </li>\n    <li><strong>Network Model:</strong>\n      <ul>\n        <li>Builds on the hierarchical model, allowing many-to-many relationships (multiple parent records).</li>\n        <li>Based on mathematical set theory, structured with sets of related records (owner/parent and member/child records).</li>\n        <li>A record can be a child in multiple sets, enabling complex relationships.</li>\n        <li>Popular in the 70s after being defined by CODASYL.</li>\n      </ul>\n    </li>\n    <li><strong>Object-Oriented Database Model:</strong>\n      <ul>\n        <li>Defines a database as a collection of <strong>objects</strong> (reusable software elements) with features and methods.</li>\n        <li>Examples:\n          <ul>\n            <li><strong>Multimedia database:</strong> Stores media like images not suitable for relational databases.</li>\n            <li><strong>Hypertext database:</strong> Allows any object to link to any other object, useful for disparate data but not numerical analysis.</li>\n          </ul>\n        </li>\n        <li>Considered a post-relational or <strong>hybrid database model</strong> as it incorporates and extends beyond tables.</li>\n      </ul>\n    </li>\n    <li><strong>Entity-Relationship (ER) Model:</strong>\n      <ul>\n        <li>Captures relationships between real-world <strong>entities</strong> (people, places, things) and their <strong>attributes</strong>.</li>\n        <li>Focuses on conceptual database design rather than physical structure.</li>\n        <li>Maps <strong>cardinality</strong> (relationships) between entities.</li>\n        <li>A common form is the <strong>star schema</strong>, where a central fact table connects to multiple dimensional tables.</li>\n      </ul>\n    </li>\n    <li><em>Other Models:</em> Document model, Entity-attribute-value model, Star schema, Object-relational model.</li>\n  </ul>\n\n  <h3>What is Data Independence?</h3>\n  <ul>\n    <li><strong>Data Independence:</strong> A DBMS property allowing changes to the database schema at one level without affecting the schema at the next higher level.</li>\n    <li>Keeps data separate from programs that use it.</li>\n  </ul>\n\n  <h3>Types of Data Independence</h3>\n  <ol>\n    <li><strong>Physical Data Independence:</strong>\n      <ul>\n        <li>Separates the conceptual level from the internal/physical levels.</li>\n        <li>Allows changing physical storage structures or devices without affecting the conceptual schema.</li>\n        <li>Easier to achieve than logical independence.</li>\n        <li><em>Examples of changes that don't affect the conceptual layer:</em> Using new storage devices, modifying file organization, switching data structures, changing access methods, modifying indexes, altering compression techniques, changing database location.</li>\n      </ul>\n    </li>\n    <li><strong>Logical Data Independence:</strong>\n      <ul>\n        <li>Ability to change the conceptual schema without altering external views, APIs, or programs.</li>\n        <li>More challenging to achieve than physical independence.</li>\n        <li><em>Examples of changes that don't affect the external layer:</em> Adding/modifying/deleting attributes, entities, or relationships; merging records; breaking records into multiple parts.</li>\n      </ul>\n    </li>\n  </ol>\n  <p>\n    <strong>Difference:</strong> Physical independence deals with changes to the storage details, while logical independence deals with changes to the conceptual structure visible to applications.\n  </p>\n\n  <h3>Database Architecture</h3>\n  <ul>\n    <li>A <strong>Database Architecture</strong> is a representation of the DBMS design, aiding in designing, developing, implementing, and maintaining the system.</li>\n    <li>Divides the database system into independent, modifiable components.</li>\n    <li>Choosing the correct architecture ensures efficient data management.</li>\n  </ul>\n\n  <h3>Types of DBMS Architecture</h3>\n  <ol>\n    <li><strong>1-Tier Architecture (Single Tier):</strong>\n      <ul>\n        <li>Client, server, and database all reside on the same machine.</li>\n        <li>Simplest form, primarily used for local practice (e.g., installing a database on your PC).</li>\n        <li>Rarely used in production environments.</li>\n      </ul>\n    </li>\n    <li><strong>2-Tier Architecture:</strong>\n      <ul>\n        <li>Presentation layer runs on a client (PC, mobile), and data is stored on a separate server (second tier).</li>\n        <li>Provides added security as the DBMS is not directly exposed to end-users.</li>\n        <li>Offers direct and faster communication between client and server.</li>\n        <li><em>Example:</em> A Contact Management System using MS-Access where the client application connects directly to the database server.</li>\n      </ul>\n    </li>\n    <li><strong>3-Tier Architecture (Most Popular):</strong>\n      <ul>\n        <li>An extension of 2-tier, separating functional processes, logic, data access, storage, and user interface into independent modules.</li>\n        <li>Consists of three layers:\n          <ol>\n            <li><strong>Presentation Layer:</strong> User interface (e.g., PC, tablet).</li>\n            <li><strong>Application Layer (Business Logic Layer):</strong> Resides between the user and DBMS. Processes user requests, functional logic, constraints, and rules before communicating with the DBMS or user.</li>\n            <li><strong>Database Server:</strong> Stores and manages data.</li>\n          </ol>\n        </li>\n      </ul>\n    </li>\n  </ol>\n\n  <h3>Three Schema Architecture (ANSI/SPARC Architecture)</h3>\n  <ul>\n    <li>A framework to describe the structure of a specific database system, separating user applications from the physical database.</li>\n    <li>Comprises three levels:</li>\n    <ol>\n      <li><strong>Internal Level (Physical Schema):</strong>\n        <ul>\n          <li>Describes the physical storage structure of the database.</li>\n          <li>Uses a physical data model, defining how data is stored in blocks.</li>\n          <li>Details complex low-level data structures.</li>\n        </ul>\n      </li>\n      <li><strong>Conceptual Level (Logical Level):</strong>\n        <ul>\n          <li>Describes the overall design/structure of the entire database.</li>\n          <li>Defines what data is stored and the relationships among that data.</li>\n          <li>Hides internal details like data structure implementation.</li>\n          <li>Database administrators and programmers typically work at this level.</li>\n        </ul>\n      </li>\n      <li><strong>External Level (View Schema/Subschema):</strong>\n        <ul>\n          <li>Contains multiple schemas (subschemas), each describing a specific view of the database.</li>\n          <li>Describes the portion of the database a particular user group is interested in, hiding the rest.</li>\n          <li>Defines the end-user's interaction with the database system.</li>\n        </ul>\n      </li>\n    </ol>\n    <li><strong>Mapping:</strong> Used to transform requests and responses between these architectural levels (e.g., External/Conceptual mapping, Conceptual/Internal mapping). This process can add overhead for small DBMS.</li>\n  </ul>\n</div>";

const PdfPage = () => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  // previewHtml: when non-null -> render the PDF-like viewer (replaces the default UI)
  const [previewHtml, setPreviewHtml] = useState(null);
  const [previewTitle, setPreviewTitle] = useState(""); // optional title to display
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // toast helper (same as your earlier implementation)
  const showToast = (message, type = "info") => {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `alert alert-${type} shadow-lg max-w-md w-full`;
    toast.innerHTML = `<div><span>${message}</span></div>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("opacity-0", "transition-opacity");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  };

  // Submit handler: POST topic, set previewHtml on success, fallback to dummy
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!topic.trim()) {
      showToast("⚠️ Please enter a topic first!", "warning");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      // try to parse JSON; if server returns error will throw
      const data = await res.json().catch(() => null);

      // if server response valid and has summary HTML -> use it
      if (data && data.success && typeof data.summary === "string" && data.summary.trim()) {
        setPreviewHtml(data.summary);
        // try to extract a <h2> or use topic as title
        const tmp = document.createElement("div");
        tmp.innerHTML = data.summary;
        const h2 = tmp.querySelector("h2");
        setPreviewTitle(h2 ? h2.textContent : topic);
        showToast("📘 Summary generated successfully", "success");
      } else {
        // fallback to dummy
        setPreviewHtml(DUMMY_SUMMARY);
        setPreviewTitle(topic || "Summary Preview");
        showToast("⚠️ No valid summary from server — showing dummy preview", "warning");
      }
    } catch (err) {
      console.error(err);
      setPreviewHtml(DUMMY_SUMMARY);
      setPreviewTitle(topic || "Summary Preview");
      setError("Server error - showing dummy preview");
      showToast("❌ Error connecting to server — showing dummy preview", "error");
    } finally {
      setLoading(false);
      // clear input to match prior behavior (optional)
      setTopic("");
      // scroll to top so preview is visible
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Back from preview -> clear previewHtml and show the original UI again
  const handleBackFromPreview = () => {
    setPreviewHtml(null);
    setPreviewTitle("");
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------- When previewHtml exists -> render the PDF-like view (mutually exclusive) ----------
  if (previewHtml) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-red-950 to-rose-950 text-white px-6 md:px-16 pt-28 relative overflow-auto">
        <FaBookOpen className="absolute top-58 left-24 text-red-700/30 text-7xl animate-float-slow" />
      <FaRegLightbulb className="absolute bottom-28 left-40 text-yellow-500/25 text-6xl animate-float" />
      <FaMagic className="absolute top-46 right-32 text-rose-400/30 text-7xl rotate-12 animate-float-rev" />
        {/* toast container (keep) */}
        <div id="toast-container" className="absolute top-50 toast toast-bottom toast-end z-50 space-y-2"></div>

        {/* Back button (fixed) */}
        <button
          onClick={handleBackFromPreview}
          className=" md:mt-10 px-4 py-2 rounded-full border-2 border-red-400 text-red-400 bg-[#2b0f0f]/60 hover:bg-red-400 hover:text-black transition flex items-center gap-2 z-40 shadow-md"
        >
          ← Back
        </button>

        {/* Page header */}
        <h1 className="w-full mt-3 text-4xl md:text-5xl font-extrabold text-center mb-8 leading-snug bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 animate-shimmer">
          Notes: {previewTitle || "Summary"}
        </h1>

        {/* PDF-like container */}
        <div className="w-full max-w-4xl p-6 md:p-12 bg-white text-black rounded-2xl shadow-2xl z-30"
             style={{ minHeight: "65vh", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
          {/* toolbar area */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">Generated notes — preview mode</div>
            <div className="flex items-center gap-3">
              <button
                className="px-3 py-1 rounded-md border border-gray-200 text-sm bg-gray-100 hover:bg-gray-200"
                aria-label="Print"
              >
                Download
              </button>
            </div>
          </div>

          {/* content area (scrollable inside PDF box) */}
{/* --- Wrapper (fixed gradient stripe + scrollbox) --- */}
<div className="relative w-full max-w-3xl">

  {/* Left gradient stripe — fixed, does NOT move on scroll */}
  <div className="absolute left-1.25 top-0 h-full w-1.25 bg-gradient-to-b from-red-500 to-yellow-500 opacity-60 rounded-l-xl z-20 pointer-events-none" />

  {/* --- Scrollable content box --- */}
  <div
    className="
      relative overflow-auto prose prose-lg max-w-none
      px-8 py-6 rounded-xl
      bg-gradient-to-br from-white to-gray-50
      shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      border border-gray-200/70
      animate-fadeIn
      ml-1   /* shifts content so stripe doesn’t overlap */
    "
    style={{
      maxHeight: "calc(65vh - 60px)",
      paddingRight: 16,
    }}
  >
   

    {/* HTML injected */}
    <div
      dangerouslySetInnerHTML={{ __html: previewHtml }}
      className="relative z-10"
    />
  </div>
</div>

<style>
{`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn { animation: fadeIn 0.4s ease-out; }

  .prose h1, .prose h2, .prose h3 {
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  .prose h2 {
    color: #b91c1c;
    border-bottom: 2px solid #fca5a5;
    padding-bottom: 4px;
    margin-top: 1rem;
  }

  .prose h3 {
    color: #dc2626;
    margin-top: 0.75rem;
  }

  .prose ul li::marker { color: #ef4444; }

  .prose blockquote {
    border-left: 4px solid #ef4444;
    padding-left: 1rem;
    color: #444;
    font-style: italic;
  }

  .prose pre {
    background: #111827;
    color: #f3f4f6;
    border-radius: 0.5rem;
    padding: 1rem;
    overflow-x: auto;
  }

  .prose table {
    border-collapse: collapse;
    width: 100%;
  }
  .prose th, .prose td {
    border: 1px solid #e5e7eb;
    padding: 8px;
  }
`}
</style>

        </div>

        {/* small footer / note */}
        <p className="my-8 text-sm text-gray-300">
          Tip: use Print to export as PDF, or hit Back to generate another topic.
        </p>

        {/* minor styling for shimmer */}
        <style>{`
          @keyframes shimmer { 0% { background-position: -100% 0; } 100% { background-position: 100% 0; } }
          .animate-shimmer { animation: shimmer 6s linear infinite; background-size: 300% 100%; }
          /* basic typography for server HTML (you can customize) */
          .prose h2 { font-size: 1.5rem; margin-bottom: 0.5rem; }
          .prose h3 { font-size: 1.125rem; margin-top: 0.75rem; }
          .prose p, .prose li { color: #111827; line-height: 1.6; }
          .prose ul { padding-left: 1.25rem; }
        `}</style>
        <style>
        {`
          @keyframes float {0%{transform:translateY(0);}50%{transform:translateY(-12px);}100%{transform:translateY(0);}}
          @keyframes float-slow {0%{transform:translateY(0);}50%{transform:translateY(-8px);}100%{transform:translateY(0);}}
          @keyframes float-rev {0%{transform:translateY(0);}50%{transform:translateY(10px);}100%{transform:translateY(0);}}
          @keyframes shimmer {0%{background-position:-100% 0;}100%{background-position:100% 0;}}
          .animate-float {animation:float 5s ease-in-out infinite;}
          .animate-float-slow {animation:float-slow 7s ease-in-out infinite;}
          .animate-float-rev {animation:float-rev 6s ease-in-out infinite;}
          .animate-shimmer {animation:shimmer 6s linear infinite;}
        `}
      </style>

      </section>
    );
  }

  // ---------- Default UI (input form) ----------
  return (
    <section className="h-screen bg-gradient-to-br from-black via-red-950 to-rose-950 text-white flex flex-col items-center justify-center px-6 md:px-16 pt-28 relative overflow-hidden">
      {/* 🧃 Toast Container */}
      <div id="toast-container" className="absolute top-50 toast toast-bottom toast-end z-50 space-y-2"></div>

      {/* ✨ Animated Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#1e1e1e_1px,transparent_0)] bg-[size:22px_22px] opacity-10"></div>
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-red-700/25 blur-[180px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-orange-700/25 blur-[180px] rounded-full -z-10 animate-pulse delay-700"></div>
      <div className="absolute bottom-20 left-1/3 w-[400px] h-[400px] bg-rose-500/15 blur-[160px] rounded-full -z-10"></div>

      {/* Floating Icons */}
      <FaBookOpen className="absolute top-38 left-24 text-red-700/30 text-7xl animate-float-slow" />
      <FaRegLightbulb className="absolute bottom-28 left-40 text-yellow-500/25 text-6xl animate-float" />
      <FaMagic className="absolute top-46 right-32 text-rose-400/30 text-7xl rotate-12 animate-float-rev" />

      {/* Header */}
      <h1 className="w-full mt-18 md:mt-0 text-4xl sm:text-6xl font-extrabold text-center mb-4 leading-snug relative bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 animate-shimmer bg-[length:300%_100%]">
        Generate Stunning PDF Notes
      </h1>

      <p className="text-gray-400 text-lg text-center mb-2 max-w-2xl">
        Type a topic and let AI transform it into structured, concise study notes.
      </p>
      <p className="text-red-400/80 text-sm text-center mb-12 italic">
        Perfect for students, researchers, and quick learners.
      </p>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.1)] flex flex-col items-center gap-6 w-full max-w-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(239,68,68,0.3)] z-30"
      >
        {/* Input Field */}
        <div className="flex items-center w-full gap-3 bg-gray-900/70 border border-gray-700 rounded-xl px-5 py-4 focus-within:border-red-500 transition-all duration-300 shadow-inner hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <FaBookOpen className="text-2xl text-red-400" />
          <input
            type="text"
            placeholder="Enter a topic (e.g., Quantum Computing)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-transparent outline-none w-full text-white text-lg placeholder-gray-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`relative flex items-center justify-center gap-2 border-2 md:px-10 px-3 py-3 rounded-full  text-sm md:text-lg font-semibold overflow-hidden transition duration-300 ${
            loading
              ? "border-gray-600 text-gray-400 cursor-not-allowed"
              : "border-white text-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          }`}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 opacity-0 hover:opacity-20 blur-xl transition duration-500"></span>
          {loading ? (
            <span>Generating...</span>
          ) : (
            <>
              <FaMagic className="text-xl text-red-400 animate-pulse" />
              Generate PDF
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-0 sm:mt-16 py-4 text-sm text-gray-500 text-center tracking-wide z-10">
        ✨ Powered by AI — turn any idea into well-structured notes effortlessly.
      </p>

      {/* Animations */}
      <style>
        {`
          @keyframes float {0%{transform:translateY(0);}50%{transform:translateY(-12px);}100%{transform:translateY(0);}}
          @keyframes float-slow {0%{transform:translateY(0);}50%{transform:translateY(-8px);}100%{transform:translateY(0);}}
          @keyframes float-rev {0%{transform:translateY(0);}50%{transform:translateY(10px);}100%{transform:translateY(0);}}
          @keyframes shimmer {0%{background-position:-100% 0;}100%{background-position:100% 0;}}
          .animate-float {animation:float 5s ease-in-out infinite;}
          .animate-float-slow {animation:float-slow 7s ease-in-out infinite;}
          .animate-float-rev {animation:float-rev 6s ease-in-out infinite;}
          .animate-shimmer {animation:shimmer 6s linear infinite;}
        `}
      </style>
    </section>
  );
};

export default PdfPage;
