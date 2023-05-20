import { ReactElement, useState } from 'react';

export enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const useMultiStepRentForm = (steps: ReactElement[]) => {
	const [currentStepIndex, setCurrentStepIndex] = useState(STEPS.CATEGORY);

	function goToNext() {
		setCurrentStepIndex((value) => {
			if (value === STEPS.PRICE) return value;
			return value + 1;
		});
	}

	function goBack() {
		setCurrentStepIndex((value) => {
			if (value === STEPS.CATEGORY) return value;
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
		isFirstStep: currentStepIndex === STEPS.CATEGORY,
		isLastStep: currentStepIndex === STEPS.PRICE,
		goTo,
		goToNext,
		goBack,
	};
};

export default useMultiStepRentForm;
