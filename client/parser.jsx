const parseSteps = (gptResponse) => {
    const steps = gptResponse.split(/\n(?=Step \d+:)/); // Split response by steps
    const instructionsDict = {};
    const questionsDict = {};
    const answersDict = {};

    steps.forEach((step) => {
      const stepMatch = step.match(/Step (\d+): (.+?)\n/); // Match step number and title
      const instructionMatch = step.match(/-\s*(.+?)\n- Link:/s); // Match instruction before link
      const questionMatch = step.match(/Multiple Choice Question:\s*([\s\S]*?)(?=\nAnswer:)/); // Match question
      const answerMatch = step.match(/Answer:\s*(.+)/); // Match answer

      if (stepMatch) {
        const stepNumber = parseInt(stepMatch[1], 10); // Extract step number
        const instruction = instructionMatch ? instructionMatch[1].trim() : ""; // Extract instruction
        const question = questionMatch ? questionMatch[1].trim() : ""; // Extract question only
        const answer = answerMatch ? answerMatch[1].trim() : ""; // Extract answer

        instructionsDict[stepNumber] = instruction;
        questionsDict[stepNumber] = question; // Store question without answer
        answersDict[stepNumber] = answer; // Store answer separately
      } else {
        console.error("Step Match Failed for Step:", step);
      }
    });

    return { instructionsDict, questionsDict, answersDict };
  };

  const { instructionsDict, questionsDict, answersDict } = parseSteps(gptResponse);


