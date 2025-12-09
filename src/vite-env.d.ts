/// <reference types="vite/client" />

import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"capture-eye": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
				nid: string;
				layout?: string;
				position?: string;
				visibility?: string;
				"heading-source"?: string;
				"cz-title"?: string;
				"action-button-text"?: string;
				"action-button-link"?: string;
				"cr-pin"?: string;
				"eng-img"?: string;
				"eng-link"?: string;
			};
		}
	}
}

export {};
