<script setup>
import { usePlayerStore } from "@/store/player.js";
import { useUserStore } from "@/store/user.js";

import { onShow, onLaunch } from "@dcloudio/uni-app";

const playerStore = usePlayerStore();
const userStore = useUserStore();
onLaunch(() => {
  userStore.checkLoginStatus();
});

onShow(() => {
  playerStore.initPlayer();
});
</script>

<style lang="scss">
@import "@/uni_modules/uni-scss/index.scss";
@import "@/static/customicons.css";

page {
  box-sizing: border-box;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
}

.click-hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
