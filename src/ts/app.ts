(() => {
	enum EventTypes {
		CLICK = 'click',
		CONTENTLOADED = 'DOMContentLoaded',
	}

	interface IAdvice {
		id: number;
		advice: string;
	}

	const rollDice = document.querySelector('[data-roll]') as HTMLButtonElement;
	const spinner = document.querySelector('[data-spinner]') as HTMLDivElement;
	const adviceID = document.querySelector('[data-id]') as HTMLSpanElement;
	const adviceDescription = document.querySelector(
		'[data-description]'
	) as HTMLParagraphElement;

	const renderAdviceData = ({ id, advice }: IAdvice) => {
		adviceID.textContent = `#${id}`;
		adviceDescription.textContent = advice;
	};

	const fetchAdviceData = async () => {
		try {
			const response = await fetch('https://api.adviceslip.com/advice', {
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
				},
			});
			const { slip } = await response.json();
			spinner.style.display = 'none';
			renderAdviceData(slip);
		} catch (err) {
			if (err instanceof Error) {
				return err.message;
			}
			return err;
		}
	};

	rollDice?.addEventListener(EventTypes.CLICK, fetchAdviceData);
	window?.addEventListener(EventTypes.CONTENTLOADED, fetchAdviceData);
})();
