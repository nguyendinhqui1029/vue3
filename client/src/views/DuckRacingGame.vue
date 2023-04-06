<template>
  <canvas id="canvas2">
  </canvas>
  <canvas id="canvas3">
  </canvas>
  <canvas id="canvas4">
  </canvas>
  <canvas id="canvas5">
  </canvas>
  <canvas id="canvas6">
  </canvas>
  <canvas id="canvas7">
  </canvas>
  <canvas id="canvas1">
  </canvas>
</template>
<script>
import { DuckBlue } from '@/utils/duck-racing-game/duck-blue.js';
import { CityBackground } from '@/utils/duck-racing-game/city-background';

export default {
  name: 'DuckRacingGame',
  components: {},
  setup() {
  },
  mounted() {
    const duck1 = new DuckBlue(0.001, -40, 'canvas2', require('@/utils/duck-racing-game/images/duck_1.png'));
    const duck2 = new DuckBlue(0.01, -20, 'canvas3', require('@/utils/duck-racing-game/images/duck_2.png'));
    const duck3 = new DuckBlue(0.003, 0, 'canvas4', require('@/utils/duck-racing-game/images/duck_blue_3.png'));
    const duck4 = new DuckBlue(0.1, 20, 'canvas5', require('@/utils/duck-racing-game/images/duck_blue_4.png'));
    const duck5 = new DuckBlue(0.02, 40, 'canvas6', require('@/utils/duck-racing-game/images/duck_5.png'));
    const duck6 = new DuckBlue(0.006, 50, 'canvas7', require('@/utils/duck-racing-game/images/duck_6.png'));
    duck1.drawDuck();
    duck2.drawDuck();
    duck3.drawDuck();
    duck4.drawDuck();
    duck5.drawDuck();
    duck6.drawDuck();
    const city = new CityBackground(0.3, 'canvas1', require('@/utils/duck-racing-game/images/background-city.png'));
    city.drawCity();
  }
}
</script>

<style scoped>
#canvas2 {
  z-index: 200;
}
#canvas3 {
  z-index: 199;
}
#canvas4 {
  z-index: 198;
}
#canvas5 {
  z-index: 197;
}
#canvas6 {
  z-index: 196;
}
#canvas7 {
  z-index: 195;
}
#canvas2,
#canvas3,
#canvas4,
#canvas5,
#canvas6,
#canvas7 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#canvas1 {
  /* border:  5px solid black; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

#city-background {
  display: flex;
  flex: 5;
  width: 100%;
  background-image: url('@/utils/duck-racing-game/images/background-city.png');
  background-position: center;
  background-size: contain;
}

#road-background {
  display: flex;
  flex: 6;
  width: 100%;
  background-image: url('@/utils/duck-racing-game/images/street.png');
  background-position: center;
  background-size: contain;
}</style>
