import { ref } from "vue"
import { defineStore } from "pinia"

export const usePlayerStore = defineStore('player', () => {
	const currentCover = ref("https://miren.lovemi.ren/colorui-document/img/colorui-logo.png");

	return { currentCover };
});
