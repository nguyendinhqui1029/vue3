
<template>
  <div class="menu">
    <MobileHeader :menuType="'back-menu'" />
  </div>
  <ul class="wallet">
    <li v-for="item in list.list" :key="item.id">
      <div class="header" :class="{ 'border-bottom': item.isExpand }" @click="expandInfo(item.id)">
        {{ item.name }}
        <vue-feather :type="item.isExpand ? 'chevron-up' : 'chevron-down'"></vue-feather>
      </div>
      <div :class="{ 'show-expand': item.isExpand, 'hidden-expand': !item.isExpand }">
        <div class="account-info" v-if="sectionIdSelected === 1">
          <span class="label">Tên:</span><span class="value">{{ userInfo.name }}</span>
          <span class="label">ID:</span><span class="value-wrapper"><span class="value">{{ userInfo.id
          }}</span><vue-feather :size="20" :type="'copy'" @click="copyId(userInfo.id)"></vue-feather></span>
          <span class="label">Email:</span><span class="value">{{ userInfo.email }}</span>
          <span class="label">Số dư:</span><span><span class="value">{{ userInfo.balance }}</span><span
              class="currency">Xu</span></span>
          <span class="label">Số điện thoại:</span><span class="value">{{ userInfo.phone }}</span>
          <span v-if="userInfo.walletLink.length" class="label">Ví đã liên kết:</span>
          <span v-if="userInfo.walletLink.length">
            <ul>
              <li v-for="item in userInfo.walletLink" :key="item.address">
                <span class="waller-name">{{ item.name }}</span>
                <small>Địa chỉ ví: {{ item.address }}</small>
                <vue-feather :size="20" class="delete-icon" type="trash-2"></vue-feather>
              </li>
            </ul>
          </span>
        </div>
        <div class="setup-wallet" v-else-if="sectionIdSelected === 2">
          <InputControl type="text" label="Tên ví" placeholder="Đặt tên định danh cho ví" />
          <InputControl type="text" label="ID ví" placeholder="Mã ví muốn liên kết" />
          <CheckBoxControl :value="false" label="Tôi xác nhận đây là địa chỉ ví của tôi."/>
          <ButtonControl label="Liên kết với ví"/>
        </div>
        <div class="transfer" v-else-if="sectionIdSelected === 4">
          <RadioButtonControl :value="true" label="Chuyển từ ví đến tài khoản."/>
          <RadioButtonControl :value="false" label="Chuyển từ tài khoản đến ví."/>
          <DropdownControl @dropdownChange="dropdownWalletChange($event)" label="Ví" :options="userInfo.walletLink.map(item=>({id: item.address, name: item.name}))" :initialValue="[userInfo.walletLink[0].address]"/>
          <InputControl type="text" :isDisabled="true" label="Tài khoản" placeholder="Tài khoản" :modelValue="userInfo.id" />
          <InputControl type="number" label="Số lượng" placeholder="Nhập số xu" />
          <InputControl type="text" :isDisabled="true" label="Phí chuyển" placeholder="Phí chuyển xu" />
          <CheckBoxControl :value="false" label="Tôi hoàn toàn đồng ý với mức phí chuyển và số lượng chuyển này."/>
          <ButtonControl label="Chuyển"/>
        </div>
        <div class="account-info" v-else-if="sectionIdSelected === 5">
          account-info4
        </div>
        <div class="block-account" v-else-if="sectionIdSelected === 6">
          <p>Vui lòng xác nhận rằng bạn đồng ý khóa tài khoản với ID là: <span class="bold">{{ userInfo.id }}</span>.<br/> Nếu bạn đồng ý khóa hãy nhập ID vào ô bên dưới.</p>
          <InputControl type="text" placeholder="Nhập ID của bạn" />
          <ButtonControl label="Khóa account" class="margin-top" @buttonClick="blockAccount()"/>
        </div>
      </div>
    </li>
  </ul>
</template>
<script scope>
import MobileHeader from '../components/client/mobile/MobileHeader.vue';
import InputControl from '@/components/shared/InputControl.vue';
import ButtonControl from '@/components/shared/ButtonControl.vue';
import RadioButtonControl from '@/components/shared/RadioButtonControl.vue';
import CheckBoxControl from '@/components/shared/CheckBoxControl.vue';
import DropdownControl from '@/components/shared/DropdownControl.vue';

import { ref, reactive } from 'vue';
export default {
  name: 'MobileWalletView',
  components: { MobileHeader, InputControl, ButtonControl, RadioButtonControl, CheckBoxControl, DropdownControl },
  setup() {
    const isExpand = ref(false);
    const sectionIdSelected = ref('');
    const userInfo = reactive({
      name: 'Nguyễn Văn A',
      id: '100011',
      email: 'nguyenvana@gmail.com',
      phone: '0123456xxxx',
      balance: 100000,
      walletLink: [{name:'Ví 1', address: 'axvscXXXXXXcdfg'},{name:'Ví 2', address: 'axvsfXXXXXXcdfg'}]
    })
    let list = reactive({
      list: [
        { id: 1, isExpand: false, name: 'Thông tin tài khoản' },
        { id: 2, isExpand: false, name: 'Liên kết với ví' },
        { id: 4, isExpand: false, name: 'Trao đổi xu với ví' },
        { id: 5, isExpand: false, name: 'Thông tin cần biết về tài khoản' },
        { id: 6, isExpand: false, name: 'Khóa tài khoản' }
      ]
    });

    function expandInfo(id) {
      sectionIdSelected.value = id;
      list.list = list.list.map(item => {
        if (item.isExpand && item.id === id) {
          item.isExpand = false;
          return item;
        }
        return { ...item, isExpand: item.id === id }
      })
    }

    async function copyId(id) {
      try {
        await navigator.clipboard.writeText(id);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }

    function blockAccount() {
      console.log('block account')
    }

    function dropdownWalletChange($event) {
      console.log('dropdownWalletChange',$event)
    }
    return { isExpand, list, sectionIdSelected, userInfo, expandInfo, copyId, blockAccount, dropdownWalletChange};
  }
}
</script>
<style scoped>
.waller-name {
  font-weight: bold;
}
.delete-icon {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
span ul {
  margin: 0;
  padding: 0;
}
span ul li {
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  margin-bottom: 10px;
}
.setup-wallet {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.transfer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.block-account p {
  margin: 0;
}
.block-account {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.bold {
  font-weight: bold;
}
.label {
  font-weight: bolder;
}

.currency {
  margin-left: 5px;
}

.value-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.account-info {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-auto-rows: auto;
  gap: 12px 0;
}

.show-expand {
  display: block;
  box-shadow: 0px 3px 2px gray;
  padding: 16px;
}

.hidden-expand {
  display: none;
}

.wallet {
  margin: 0;
  padding: 16px;
  list-style: none;
}

.wallet li {
  height: max-content;
}

.header {
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.border-bottom {
  border-bottom: 1px solid;
}

.menu {
  background: var(--primary-color);
}</style>