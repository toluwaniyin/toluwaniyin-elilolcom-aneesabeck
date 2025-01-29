// import React, { useState, useContext } from "react";
// import { post } from "../../utilities";
// import { UserContext } from "../App.jsx";
// import { ToastContainer, toast } from "react-toastify";
// import "./CreateTreeButton.css";

// export const HandleCreateTree = (props) => {
//   const userContext = useContext(UserContext);
//   const addTree = (treeName, learningTopic, customText) => {
//     if (!treeName) {
//       toast.error(`Enter a name for your tree`);
//       return;
//     }
//     if (props.existingTrees.includes(treeName)) {
//       toast.error(`Tree "${treeName}" already exists.`);
//       return; // Exit early if treeName exists
//     }
//     const body = {
//       name: treeName,
//       userid: userContext.userId,
//       progress: 0,
//       learningTopic: learningTopic,
//       customText: customText,
//       username: userContext.username,
//     }; // fill in body with value
//     // // props.createNewTree({_id: })

//     post("/api/tree", body).then((tree) => props.createTree(tree));
//   };
//   console.log("UserContext:", userContext);

//   return (
//     <>
//       <CreateTreeButton onSubmit={addTree} />
//       <ToastContainer />
//     </>
//   );
// };

// export const CreateTreeButton = (props) => {
//   const [value, setValue] = useState("");
//   const [learningTopic, setLearningTopic] = useState("");
//   const [customText, setCustomText] = useState("");
//   const [inputType, setInputType] = useState("learningTopic");

//   const handleClick = (event) => {
//     console.log("buttonClicked");
//     event.preventDefault();
//     props.onSubmit(value, learningTopic, customText);
//     setValue("");
//     setLearningTopic("");
//     setCustomText("");
//   };
//   return (
//     <div className="createTreeButton">
//       <input
//         type="text"
//         placeholder="Enter Tree Name"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//       ></input>
//       <div>
//         <label>
//           <input
//             type="radio"
//             value="learningTopic"
//             checked={inputType === "learningTopic"}
//             onChange={() => setInputType("learningTopic")}
//           />
//           AI Mode
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="customText"
//             checked={inputType === "customText"}
//             onChange={() => setInputType("customText")}
//           />
//           Self Mode
//         </label>
//       </div>
//       {inputType === "learningTopic" && (
//         <input
//           type="text"
//           placeholder="I want to learn..."
//           value={learningTopic}
//           onChange={(e) => setLearningTopic(e.target.value)}
//         />
//       )}
//       {inputType === "customText" && (
//         <textarea
//           placeholder="Enter your custom text"
//           value={customText}
//           onChange={(e) => setCustomText(e.target.value)}
//         />
//       )}
//       <button onClick={handleClick}>+ Create New Tree</button>
//     </div>
//   );
// };

import React, { useState, useContext } from "react";
import { post } from "../../utilities";
import { UserContext } from "../App.jsx";
// import { ToastContainer, toast } from 'react-toastify';
//import { ToastContainer, toast } from "react-toastify";
import "./CreateTreeButton.css";
import Swal from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.css';


export const HandleCreateTree = (props) => {
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const addTree = (treeName, learningTopic, customText) => {
    if (!treeName) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter a name for your tree',
      });
      return;
    }
    setLoading(true);
    if (props.existingTrees.includes(treeName)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Tree "${treeName}" already exists.`,
      });
      return; // Exit early if treeName exists
    }

    if (customText.length > 6000) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Custom text exceeds 6000 characters. Please shorten it.',
      });
      return; // Prevent further action if validation fails
    }
    const body = {
      name: treeName,
      userid: userContext.userId,
      progress: 0,
      learningTopic: learningTopic,
      customText: customText,
      username: userContext.username,
    }; // fill in body with value
    // // props.createNewTree({_id: })

    post("/api/tree", body)
      .then((tree) => {
        props.createTree(tree);
        // toast.success(`🌳 Tree "${treeName}" created!`);
        Swal.fire({
          icon: 'success',
          title: 'Tree Created!',
          text: `🌳 Tree "${treeName}" created!`,
        });

      })
      .catch((err) => {

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "🚨 Error creating tree.",
        });
        console.error("Error:", err);
      })
      .finally(() => setLoading(false)); // ✅ Stop loading
  };

  return (
    <>
      {/* <CreateTreeButton onSubmit={addTree} /> */}
      {/* <ToastContainer /> */}
      <CreateTreeButton onSubmit={addTree} loading={loading} />
      {/* <ToastContainer /> */}
    </>
  );
};

export const CreateTreeButton = (props) => {
  const [value, setValue] = useState("");
  const [learningTopic, setLearningTopic] = useState("");
  const [customText, setCustomText] = useState("");
  const [inputType, setInputType] = useState("learningTopic");

  const handleClick = (event) => {
    console.log("buttonClicked");
    event.preventDefault();
    props.onSubmit(value, learningTopic, customText);
    setValue("");
    setLearningTopic("");
    setCustomText("");
  };
  return (
    <div className="createTreeButton">
      <input
        type="text"
        placeholder="Enter Tree Name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={props.loading} // ✅ Disable input while loading
      />
      <div>
        <label>
          <input
            type="radio"
            value="learningTopic"
            checked={inputType === "learningTopic"}
            onChange={() => setInputType("learningTopic")}
            disabled={props.loading} // ✅ Disable while loading
          />
          AI Mode
        </label>
        <label>
          <input
            type="radio"
            value="customText"
            checked={inputType === "customText"}
            onChange={() => setInputType("customText")}
            disabled={props.loading} // ✅ Disable while loading
          />
          Self Mode
        </label>
      </div>
      {inputType === "learningTopic" && (
        <input
          type="text"
          placeholder="I want to learn..."
          value={learningTopic}
          onChange={(e) => setLearningTopic(e.target.value)}
          disabled={props.loading} // ✅ Disable while loading
        />
      )}
      {inputType === "customText" && (
        <textarea
          placeholder="Enter your custom text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          disabled={props.loading} // ✅ Disable while loading
        />
      )}
      <button onClick={handleClick} disabled={props.loading}>
        {props.loading ? "🌱 Creating Tree..." : "+ Create New Tree"}
      </button>
    </div>
  );
};
