import { ReactElement, useState } from 'react';

export enum SEARCH_STEPS {
	LOCATION = 0,
	DATE = 1,
	INFO = 2,
}

const useMultiStepSearchForm = (steps: ReactElement[]) => {
	const [currentStepIndex, setCurrentStepIndex] = useState(
		SEARCH_STEPS.LOCATION
	);

	function goToNext() {
		setCurrentStepIndex((value) => {
			if (value === SEARCH_STEPS.INFO) return value;
			return value + 1;
		});
	}

	function goBack() {
		setCurrentStepIndex((value) => {
			if (value === SEARCH_STEPS.LOCATION) return value;
			return value - 1;
		});
	}

	function goTo(index: number) {
		setCurrentStepIndex(index);
	}

	return {
		currentStepIndex,
		step: steps[currentStepIndex],
		steps,
		isFirstStep: currentStepIndex === SEARCH_STEPS.LOCATION,
		isLastStep: currentStepIndex === SEARCH_STEPS.INFO,
		goTo,
		goToNext,
		goBack,
	};
};

export default useMultiStepSearchForm;
