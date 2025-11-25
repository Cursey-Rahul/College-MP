import React, { useEffect, useState } from "react";
import { FaFilePdf, FaUpload, FaBrain, FaDownload } from "react-icons/fa";

/**
 * NotesPage
 * - Uploads a PDF file (FormData) to API_ENDPOINT
 * - If API returns HTML summary -> render preview (replaces page)
 * - If API fails or returns no summary -> use DUMMY_SUMMARY fallback
 *
 * Keep UI of the upload form exactly the same.
 *
 * Update API_ENDPOINT to your server route that accepts multipart/form-data (file).
 */
const API_ENDPOINT = "http://localhost:5000/api/summary-from-pdf"; // <-- change if needed

// Minimal dummy summary (HTML string) used as fallback
const DUMMY_SUMMARY = "<div>\n  <h2>Introduction to Database Management System (DBMS)</h2>\n  <p>\n    This unit introduces the fundamental concepts of Data, Database, and Database Management Systems (DBMS). It covers the evolution from raw data to meaningful information, the structured storage of data in databases, and the software (DBMS) that facilitates its management, access, and security. Understanding these concepts is crucial for managing and interacting with digital information effectively.\n  </p>\n\n  <h3>What is Data?</h3>\n  <ul>\n    <li><strong>Data:</strong> Raw, unprocessed facts and statistics, either stored or transmitted.\n      <ul>\n        <li><em>Example:</em> IP address, cookies, name, age.</li>\n      </ul>\n    </li>\n    <li><strong>Information:</strong> Data that has been processed and organized, making it meaningful and useful.\n      <ul>\n        <li><em>Example:</em> Analyzing cookie data to determine visitor demographics (e.g., men aged 20-25 visit more).</li>\n      </ul>\n    </li>\n  </ul>\n\n  <h3>What is a Database?</h3>\n  <ul>\n    <li>A <strong>Database</strong> is an organized collection of related data, designed for easy access, management, and updating.</li>\n    <li>Can be software or hardware-based, primarily for data storage.</li>\n    <li>Historically, data was stored on slow, bulky, write-only tapes, leading to the need for better solutions.</li>\n    <li>Larry Ellison (Oracle co-founder) was a pioneer in developing software-based Database Management Systems.</li>\n  </ul>\n\n  <h3>What is DBMS?</h3>\n  <ul>\n    <li>A <strong>Database Management System (DBMS):</strong> Software that enables the creation, definition, and manipulation of databases.</li>\n    <li>Provides an interface or tool for operations like creating databases, storing, updating, and analyzing data, and managing tables.</li>\n    <li>Offers protection and security for databases and maintains data consistency, especially with multiple users.</li>\n    <li><em>Examples:</em> MySQL, Oracle, SQL Server, IBM DB2, PostgreSQL, Amazon SimpleDB.</li>\n  </ul>\n\n  <h3>Characteristics of DBMS</h3>\n  <ul>\n    <li><strong>Data Stored in Tables:</strong> Data is organized into tables within the database, with relationships between tables for meaningful connections.</li>\n    <li><strong>Reduced Redundancy:</strong> DBMS uses <strong>Normalisation</strong> to minimize data repetition, saving storage space.</li>\n    <li><strong>Data Consistency:</strong> Manages and maintains the accuracy and validity of data, even with continuous updates.</li>\n    <li><strong>Support Multiple User and Concurrent Access:</strong> Allows multiple users to perform operations (update, insert, delete) simultaneously while maintaining consistency.</li>\n    <li><strong>Query Language:</strong> Provides a simple language (e.g., SQL) for easy data manipulation (fetch, insert, delete, update).</li>\n    <li><strong>Security:</strong> Protects data from unauthorized access by creating user accounts with different permissions.</li>\n    <li><strong>Transactions Support:</strong> Manages data integrity in applications requiring multi-threading.</li>\n  </ul>\n\n  <h3>Advantages of DBMS</h3>\n  <ul>\n    <li>Segregation of application programs.</li>\n    <li>Minimal data duplication or redundancy.</li>\n    <li>Easy data retrieval using query languages.</li>\n    <li>Reduced development time and maintenance needs.</li>\n    <li>Capability to store vast amounts of data (especially with cloud data centers).</li>\n    <li>Seamless integration with application programming languages.</li>\n  </ul>\n\n  <h3>Disadvantages of DBMS</h3>\n  <ul>\n    <li>Complexity in setup and management.</li>\n    <li>Costly for licensed versions (MySQL is an exception as open-source).</li>\n    <li>Large in size, requiring significant system resources.</li>\n  </ul>\n\n  <h3>History of DBMS Milestones</h3>\n  <ul>\n    <li><strong>1960:</strong> Charles Bachman designed the first DBMS.</li>\n    <li><strong>1970:</strong> Codd introduced IBM’s Information Management System (IMS).</li>\n    <li><strong>1976:</strong> Peter Chen defined the <strong>Entity-Relationship (ER) model</strong>.</li>\n    <li><strong>1980:</strong> Relational Model became widely accepted.</li>\n    <li><strong>1985:</strong> Object-oriented DBMS developed.</li>\n    <li><strong>1990s:</strong> Object-orientation incorporated into relational DBMS.</li>\n    <li><strong>1991:</strong> Microsoft shipped MS Access, dominating personal DBMS.</li>\n    <li><strong>1995:</strong> First Internet database applications emerged.</li>\n    <li><strong>1997:</strong> XML applied to database processing, leading to integration into DBMS products.</li>\n  </ul>\n\n  <h3>Database Model</h3>\n  <ul>\n    <li>A <strong>Database Model</strong> illustrates the logical structure of a database, including relationships and constraints for data storage and access.</li>\n    <li>Models are based on broader data model rules and concepts, often represented by a database diagram.</li>\n  </ul>\n\n  <h3>Types of Database Models</h3>\n  <ul>\n    <li><strong>Relational Model (Most Common):</strong>\n      <ul>\n        <li>Sorts data into <strong>tables</strong> (relations), composed of columns and rows.</li>\n        <li>Each column represents an <strong>attribute</strong> (e.g., price, zip code).</li>\n        <li>A <strong>primary key</strong> (unique identifier) is chosen, which can be a <strong>foreign key</strong> in other tables to establish relationships.</li>\n        <li>Each row (tuple) contains data for a specific instance of the entity.</li>\n        <li>Accounts for relationships like one-to-one, one-to-many, and many-to-many.</li>\n      </ul>\n    </li>\n    <li><strong>Hierarchical Model:</strong>\n      <ul>\n        <li>Organizes data in a tree-like structure with a single parent or root for each record.</li>\n        <li>Sibling records are sorted, defining the physical storage order.</li>\n        <li>Good for describing real-world \"one-to-many\" relationships.</li>\n        <li>Primarily used by IBM’s IMS in the 60s and 70s, rarely seen today due to inefficiencies.</li>\n      </ul>\n    </li>\n    <li><strong>Network Model:</strong>\n      <ul>\n        <li>Builds on the hierarchical model, allowing many-to-many relationships (multiple parent records).</li>\n        <li>Based on mathematical set theory, structured with sets of related records (owner/parent and member/child records).</li>\n        <li>A record can be a child in multiple sets, enabling complex relationships.</li>\n        <li>Popular in the 70s after being defined by CODASYL.</li>\n      </ul>\n    </li>\n    <li><strong>Object-Oriented Database Model:</strong>\n      <ul>\n        <li>Defines a database as a collection of <strong>objects</strong> (reusable software elements) with features and methods.</li>\n        <li>Examples:\n          <ul>\n            <li><strong>Multimedia database:</strong> Stores media like images not suitable for relational databases.</li>\n            <li><strong>Hypertext database:</strong> Allows any object to link to any other object, useful for disparate data but not numerical analysis.</li>\n          </ul>\n        </li>\n        <li>Considered a post-relational or <strong>hybrid database model</strong> as it incorporates and extends beyond tables.</li>\n      </ul>\n    </li>\n    <li><strong>Entity-Relationship (ER) Model:</strong>\n      <ul>\n        <li>Captures relationships between real-world <strong>entities</strong> (people, places, things) and their <strong>attributes</strong>.</li>\n        <li>Focuses on conceptual database design rather than physical structure.</li>\n        <li>Maps <strong>cardinality</strong> (relationships) between entities.</li>\n        <li>A common form is the <strong>star schema</strong>, where a central fact table connects to multiple dimensional tables.</li>\n      </ul>\n    </li>\n    <li><em>Other Models:</em> Document model, Entity-attribute-value model, Star schema, Object-relational model.</li>\n  </ul>\n\n  <h3>What is Data Independence?</h3>\n  <ul>\n    <li><strong>Data Independence:</strong> A DBMS property allowing changes to the database schema at one level without affecting the schema at the next higher level.</li>\n    <li>Keeps data separate from programs that use it.</li>\n  </ul>\n\n  <h3>Types of Data Independence</h3>\n  <ol>\n    <li><strong>Physical Data Independence:</strong>\n      <ul>\n        <li>Separates the conceptual level from the internal/physical levels.</li>\n        <li>Allows changing physical storage structures or devices without affecting the conceptual schema.</li>\n        <li>Easier to achieve than logical independence.</li>\n        <li><em>Examples of changes that don't affect the conceptual layer:</em> Using new storage devices, modifying file organization, switching data structures, changing access methods, modifying indexes, altering compression techniques, changing database location.</li>\n      </ul>\n    </li>\n    <li><strong>Logical Data Independence:</strong>\n      <ul>\n        <li>Ability to change the conceptual schema without altering external views, APIs, or programs.</li>\n        <li>More challenging to achieve than physical independence.</li>\n        <li><em>Examples of changes that don't affect the external layer:</em> Adding/modifying/deleting attributes, entities, or relationships; merging records; breaking records into multiple parts.</li>\n      </ul>\n    </li>\n  </ol>\n  <p>\n    <strong>Difference:</strong> Physical independence deals with changes to the storage details, while logical independence deals with changes to the conceptual structure visible to applications.\n  </p>\n\n  <h3>Database Architecture</h3>\n  <ul>\n    <li>A <strong>Database Architecture</strong> is a representation of the DBMS design, aiding in designing, developing, implementing, and maintaining the system.</li>\n    <li>Divides the database system into independent, modifiable components.</li>\n    <li>Choosing the correct architecture ensures efficient data management.</li>\n  </ul>\n\n  <h3>Types of DBMS Architecture</h3>\n  <ol>\n    <li><strong>1-Tier Architecture (Single Tier):</strong>\n      <ul>\n        <li>Client, server, and database all reside on the same machine.</li>\n        <li>Simplest form, primarily used for local practice (e.g., installing a database on your PC).</li>\n        <li>Rarely used in production environments.</li>\n      </ul>\n    </li>\n    <li><strong>2-Tier Architecture:</strong>\n      <ul>\n        <li>Presentation layer runs on a client (PC, mobile), and data is stored on a separate server (second tier).</li>\n        <li>Provides added security as the DBMS is not directly exposed to end-users.</li>\n        <li>Offers direct and faster communication between client and server.</li>\n        <li><em>Example:</em> A Contact Management System using MS-Access where the client application connects directly to the database server.</li>\n      </ul>\n    </li>\n    <li><strong>3-Tier Architecture (Most Popular):</strong>\n      <ul>\n        <li>An extension of 2-tier, separating functional processes, logic, data access, storage, and user interface into independent modules.</li>\n        <li>Consists of three layers:\n          <ol>\n            <li><strong>Presentation Layer:</strong> User interface (e.g., PC, tablet).</li>\n            <li><strong>Application Layer (Business Logic Layer):</strong> Resides between the user and DBMS. Processes user requests, functional logic, constraints, and rules before communicating with the DBMS or user.</li>\n            <li><strong>Database Server:</strong> Stores and manages data.</li>\n          </ol>\n        </li>\n      </ul>\n    </li>\n  </ol>\n\n  <h3>Three Schema Architecture (ANSI/SPARC Architecture)</h3>\n  <ul>\n    <li>A framework to describe the structure of a specific database system, separating user applications from the physical database.</li>\n    <li>Comprises three levels:</li>\n    <ol>\n      <li><strong>Internal Level (Physical Schema):</strong>\n        <ul>\n          <li>Describes the physical storage structure of the database.</li>\n          <li>Uses a physical data model, defining how data is stored in blocks.</li>\n          <li>Details complex low-level data structures.</li>\n        </ul>\n      </li>\n      <li><strong>Conceptual Level (Logical Level):</strong>\n        <ul>\n          <li>Describes the overall design/structure of the entire database.</li>\n          <li>Defines what data is stored and the relationships among that data.</li>\n          <li>Hides internal details like data structure implementation.</li>\n          <li>Database administrators and programmers typically work at this level.</li>\n        </ul>\n      </li>\n      <li><strong>External Level (View Schema/Subschema):</strong>\n        <ul>\n          <li>Contains multiple schemas (subschemas), each describing a specific view of the database.</li>\n          <li>Describes the portion of the database a particular user group is interested in, hiding the rest.</li>\n          <li>Defines the end-user's interaction with the database system.</li>\n        </ul>\n      </li>\n    </ol>\n    <li><strong>Mapping:</strong> Used to transform requests and responses between these architectural levels (e.g., External/Conceptual mapping, Conceptual/Internal mapping). This process can add overhead for small DBMS.</li>\n  </ul>\n</div>";

const NotesPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // previewHtml: when non-null -> render the PDF-like viewer (replaces the default UI)
  const [previewHtml, setPreviewHtml] = useState(null);
  const [previewTitle, setPreviewTitle] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // DaisyUI Toast system (keeps your original implementation behavior)
  const showToast = (message, type = "info") => {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = `alert alert-${type} shadow-lg max-w-md w-full`;
    toast.innerHTML = `<div><span>${message}</span></div>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("opacity-0", "transition-opacity");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  };

  // Submit handler: send FormData with file, set previewHtml on success, fallback to dummy
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!file) {
      showToast("⚠️ Please upload a PDF file!", "warning");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData, // Note: DO NOT set Content-Type, browser handles boundary
      });

      // parse JSON response safely
      const data = await res.json().catch(() => null);

      // If server provided a summary HTML string -> use it
      if (data && data.success && typeof data.summary === "string" && data.summary.trim()) {
        setPreviewHtml(data.summary);
        // attempt to extract <h2> title from returned HTML
        const tmp = document.createElement("div");
        tmp.innerHTML = data.summary;
        const h2 = tmp.querySelector("h2");
        setPreviewTitle(h2 ? h2.textContent : file?.name || "Notes Preview");
        showToast("✅ Summary extracted successfully", "success");
      } else {
        // fallback to dummy
        setPreviewHtml(DUMMY_SUMMARY);
        setPreviewTitle(file?.name || "Summary Preview");
        showToast("⚠️ No valid summary from server — showing dummy preview", "warning");
      }
    } catch (err) {
      console.error(err);
      setPreviewHtml(DUMMY_SUMMARY);
      setPreviewTitle(file?.name || "Summary Preview");
      setError("Server error - showing dummy preview");
      showToast("❌ Error connecting to server — showing dummy preview", "error");
    } finally {
      setLoading(false);
      // clear file in the input to match prior behavior (optional)
      setFile(null);
      // scroll to top so the preview (when present) is visible
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
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-950 to-blue-950 text-white px-6 md:px-16 pt-24 relative overflow-auto">
        
        {/* background glows (match page theme) */}
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-purple-700/25 blur-[180px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-blue-700/25 blur-[180px] rounded-full -z-10" />

        {/* toast container */}
        <div id="toast-container" className="absolute bottom-10 right-10 toast toast-bottom toast-end z-50 space-y-2" />

        {/* Back button (fixed) */}
        <button
          onClick={handleBackFromPreview}
          className="md:mt-10 px-4 py-2  rounded-full border-2 border-purple-400 text-purple-400 bg-[#161021]/60 hover:bg-purple-400 hover:text-black transition flex items-center gap-2 z-40 shadow-md"
        >
          ← Back
        </button>

        {/* Page header (purple theme) */}
        <h1 className="w-full mt-8 text-4xl md:text-5xl font-extrabold text-center mb-8 leading-snug bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-blue-300 to-pink-300 animate-shimmer">
          Notes: {previewTitle || "Summary"}
        </h1>

        {/* PDF-like container */}
        <div
          className="w-full max-w-4xl p-6 md:p-12 bg-white text-black rounded-2xl shadow-2xl z-30"
          style={{ minHeight: "65vh", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
        >
          {/* toolbar area */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">Generated notes — preview mode</div>
            <div className="flex items-center gap-3">
              {/* Download button: downloads the HTML as .html file (simple fallback) */}
              <button
                onClick={() => {
                  const blob = new Blob([previewHtml], { type: "text/html" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${(previewTitle || "notes").replace(/\s+/g, "_")}.html`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  URL.revokeObjectURL(url);
                }}
                className="px-3 py-1 rounded-md border border-gray-200 text-sm bg-gray-100 hover:bg-gray-200"
                aria-label="Download HTML"
                title="Download HTML (use Print → Save as PDF to export as PDF)"
              >
                <FaDownload className="inline mr-2" /> Download
              </button>
            </div>
          </div>
<div className="relative w-full max-w-3xl">

  {/* Left gradient stripe — fixed, does NOT move on scroll */}
  <div
  className="
    absolute left-1.5 top-0 h-full w-1.5
    bg-gradient-to-b from-purple-900 via-purple-500 to-blue-900
    opacity-60 rounded-l-xl z-20 pointer-events-none
  "
/>


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
  /* animation */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn { animation: fadeIn 0.4s ease-out; }

  /* ===============================
     PREMIUM PURPLE THEME
  =============================== */

  .prose {
    color: #111827; /* neutral readable text */
  }

  .prose h1, .prose h2, .prose h3 {
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  /* Main section headings */
  .prose h2 {
    font-size: 1.55rem;
    color: #5b21b6;
    border-bottom: 2px solid #e9d5ff; /* light-purple underline */
    padding-bottom: 4px;
    margin-top: 1.2rem;
    margin-bottom: 0.75rem;
  }

  /* sub-headings */
  .prose h3 {
    font-size: 1.25rem;
    color: #a855f7; /* stronger purple */
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  /* body text */
  .prose p, .prose li {
    color: #1f2937;
    line-height: 1.7;
    font-size: 1.08rem;
  }

  .prose ul {
    padding-left: 1.25rem;
  }

  .prose ul li::marker {
    color: #c084fc; /* purple bullets */
  }

  /* block quotes */
  .prose blockquote {
    border-left: 4px solid #c084fc;
    padding-left: 1rem;
    color: #4b5563;
    background: #f5f3ff;
    border-radius: 0.5rem;
    font-style: italic;
  }

  /* code blocks */
  .prose pre {
    background: #0f172a;
    color: #f1f5f9;
    border-radius: 0.5rem;
    padding: 1rem;
    overflow-x: auto;
    border: 1px solid rgba(168, 85, 247, 0.25);
  }

  /* tables */
  .prose table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 1rem;
  }

  .prose th {
    background: #ede9fe;
    color: #7c3aed;
    font-weight: 600;
    padding: 8px;
    border: 1px solid #ddd6fe;
  }

  .prose td {
    border: 1px solid #e5e7eb;
    padding: 8px;
  }
`}
</style>

        </div>

        {/* small footer / note */}
        <p className="my-8 text-sm text-gray-300">
          Tip: use your browser Print → Save as PDF to export, or hit Back to analyze another file.
        </p>
      </section>
    );
  }

  // ---------- Default UI (upload form) ----------
  return (
    <section className="h-screen bg-gradient-to-br from-black via-purple-950 to-blue-950 text-white flex flex-col items-center justify-center px-6 md:px-16 pt-24 relative overflow-hidden">
      {/* 🧃 Toast Container */}
      <div id="toast-container" className="absolute bottom-10 right-10 toast toast-bottom toast-end z-50 space-y-2"></div>

      {/* ✨ Background Glows */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-purple-700/25 blur-[180px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-blue-700/25 blur-[180px] rounded-full -z-10"></div>

      {/* 💫 Header */}
      <h1 className="w-full mt-6 md:mt-0 text-4xl sm:text-6xl font-extrabold text-center mb-4 leading-snug bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 animate-shimmer bg-[length:300%_100%]">
        Upload and Analyze Notes
      </h1>

      <p className="text-gray-400 text-sm sm:text-lg text-center mb-12 max-w-2xl">
        Submit your PDF notes and let AI summarize, organize, and extract key insights.
      </p>

      {/* 📎 Upload Form (UNCHANGED UI except z-index to ensure preview overlay if needed) */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.1)] flex flex-col items-center gap-8 w-full max-w-3xl backdrop-blur-lg transition-all duration-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.3)] z-30"
      >
        {/* 📂 File Upload Area (FULL CLICKABLE) */}
        <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-2xl py-10 px-5 cursor-pointer hover:border-purple-500 hover:bg-purple-900/10 transition-all duration-300 text-center">
          <FaUpload className=" text-3xl md:text-5xl text-purple-400 mb-3" />
          {file ? (
            <span className="text-blue-400 font-medium">{file.name}</span>
          ) : (
            <span className="text-gray-400 hover:text-white text-sm md:text-lg font-medium">
              Click anywhere to upload your PDF notes
            </span>
          )}
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
        </label>

        {/* 🌟 Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-3 border-2  md:px-10 px-3  py-3 rounded-full text-sm md:text-lg font-semibold transition duration-300 ${
            loading
              ? "border-gray-600 text-gray-400 cursor-not-allowed"
              : "border-white text-white hover:bg-white hover:text-black"
          }`}
        >
          {loading ? (
            <span>Analyzing...</span>
          ) : (
            <>
              <FaBrain className="text-xl text-purple-400" />
              Analyze PDF
            </>
          )}
        </button>
      </form>

      {/* 🌌 Footer */}
      <p className="mt-4 md:mt-16 text-sm text-gray-500 text-center tracking-wide">
        ✨ Upload your study material and let AI do the thinking.
      </p>

      {/* 🌈 Animations */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }
        .animate-shimmer { animation: shimmer 6s linear infinite; }
      `}</style>
    </section>
  );
};

export default NotesPage;
