<template>
  <div class="rooms-wrapper">
    <div class="top">
      <div class="look-for-room">
        <vue-feather @click="back()" class='home' :size="35" :type="'corner-down-left'"></vue-feather>
        <input @input="filterRoomById($event)" class="search-input" type="text" placeholder="Tìm phòng theo ID" />
      </div>
      <div class="room-name"> Phòng</div>
      <div class="actions">
        <vue-feather @click="addRoom" class="plus" :size="35" :type="'plus'"></vue-feather>
      </div>
    </div>
    <div class="tables">
      <TableGame v-for="item in filterRooms.filterRooms" :key="item.idRoom" :amount="item.amount"
        :maxAmount="item.maxAmount" :idRoom="item.idRoom" :money="item.money"
        @click="navigateToLandingPage(item.idRoom)" />
    </div>
  </div>
</template>
<script>
import TableGame from '@/components/shared/TableGame.vue';
import router from '@/router';
import { reactive } from 'vue';
import { Crypto } from '@/utils/crypto';
import { useStore } from 'vuex';
import { formatUrl } from '@/utils/utils';
export default {
  name: 'GameRoomsView',
  components: {
    TableGame
  },
  setup() {
    const store = useStore();
    const crypto = new Crypto();
    const rooms = reactive({
      rooms: [
        { amount: 0, maxAmount: 3, money: 100, idRoom: 123 }, { amount: 1, maxAmount: 2, money: 100, idRoom: 124 },
        { amount: 0, maxAmount: 3, money: 100, idRoom: 125 }, { amount: 1, maxAmount: 2, money: 100, idRoom: 126 },
        { amount: 3, maxAmount: 4, money: 100, idRoom: 127 }, { amount: 1, maxAmount: 2, money: 100, idRoom: 128 },
        { amount: 5, maxAmount: 5, money: 100, idRoom: 129 }, { amount: 1, maxAmount: 2, money: 100, idRoom: 130 },
        { amount: 4, maxAmount: 6, money: 100, idRoom: 131 }, { amount: 1, maxAmount: 2, money: 100, idRoom: 132 },
        { amount: 3, maxAmount: 5, money: 100, idRoom: 133 }, { amount: 1, maxAmount: 2, money: 100, idRoom: 134 },
        { amount: 2, maxAmount: 4, money: 100, idRoom: 135 }, { amount: 1, maxAmount: 2, money: 100, idRoom: 136 },
        { amount: 1, maxAmount: 3, money: 100, idRoom: 137 }, { amount: 1, maxAmount: 2, money: 100, idRoom: 138 }
      ]
    })
    const filterRooms = reactive({ filterRooms: rooms.rooms });
    function back() {
      router.back();
    }

    function navigateToLandingPage(roomId) {
      const typeGame = router.currentRoute.value.params.idGame;
      const token = crypto.encode({passAuthor: true, typeGame, roomId}, store.state.gameTypePayloadKey);
      router.push({ path:`/loading-game/${formatUrl(token)}`});
    }
    function filterRoomById(eventValue) {
      if (!eventValue.target.value) {
        filterRooms.filterRooms = rooms.rooms;
      } else {
        filterRooms.filterRooms = rooms.rooms.filter(item => item.idRoom.toString().includes(eventValue.target.value.toString()));
      }
    }
    
    function addRoom() {
    }
    return { back, filterRoomById, navigateToLandingPage, addRoom, filterRooms }
  }
}
</script>

<style scoped>
.plus {
  color: rgb(255, 215, 0);
}
.search-input {
  width: 100%;
  border-radius: 20px;
  height: 25px;
  padding: 0 10px;
  border: none;
  margin-right: 15px;
}

.search-input:focus {
  outline: none;
}

.home {
  color: rgb(255, 215, 0);
  font-size: 30px;
}

.look-for-room {
  border-bottom: 3px solid rgb(211, 182, 17);
  border-bottom-right-radius: 50px;
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 15px;
}

.actions {
  border-bottom: 3px solid rgb(211, 182, 17);
  border-bottom-left-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
}

.look-for-room,
.actions {
  flex: 2;
  background-image: linear-gradient(to bottom, rgb(78, 73, 73, 0.6), rgb(120, 119, 119, 0.7), rgb(78, 73, 73, 0.6));
}

.room-name {
  flex: 1;
  display: flex;
  font-size: 25px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-shadow: 2px 1px gray;
  color: rgb(247 210 0);
}

.rooms-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  max-width: 100vw;
  max-height: 100vh;
}

.top {
  height: 40px;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.tables::-webkit-scrollbar-thumb,
.tables::-webkit-scrollbar-track {
  background: transparent;
}

.tables {
  display: grid;
  grid-template-columns: repeat(5, minmax(100px, 129px));
  grid-template-rows: repeat(auto-fit, 83px);
  gap: 15px;
  flex: 3;
  overflow: auto;
  padding: 16px;
  margin-top: 5px;
}</style>
