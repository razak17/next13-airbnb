import { ReactElement, useState } from 'react';

const useMultiStepRentForm = (steps: ReactElement[]) => {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	function goToNext() {
		setCurrentStepIndex((i) => {
			if (i >= steps.length - 1) return i;
			return i + 1;
		});
	}

	function goBack() {
		setCurrentStepIndex((i) => {
			if (i <= 0) return i;
			return i - 1;
		});
	}

	function goTo(index: number) {
		setCurrentStepIndex(index);
	}

	return {
		currentStepIndex,
		step: steps[currentStepIndex],
		steps,
		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,
		goTo,
		goToNext,
		goBack,
	};
};

export default useMultiStepRentForm;
