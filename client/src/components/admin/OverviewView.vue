<template>
  <DropdownControl @dropdownChange="dropdownChange($event)" label="Dropdown" :options="[{id:1,name:'Text 1'},{id:2,name:'Text 2'}]" :initialValue="[1]"/>
  <DropdownControl @dropdownChange="dropdownChange($event)" label="Dropdown" :multiple="true" :options="[{id:1,name:'Text 1'},{id:2,name:'Text 2'}]" :initialValue="[1]"/>
  <CheckBoxControl :isDisabled="true" :value="true" @checkboxClick="checkboxClick($event)" label="Checkbox disable" />
  <CheckBoxControl :value="true" @checkboxClick="checkboxClick($event)" label="Checkbox enable" />
  <RadioButtonControl :isDisabled="true" :value="true" @radioClick="radioClick($event)" label="radio disable" />
  <RadioButtonControl :value="true" @radioClick="radioClick($event)" label="radio enable" />
  <SwitchButton :initialValue="darkMode" @value-change="switchButtonChange($event)" />
  <InputControl label="Email" type="email" placeholder="Nhập email" />
  <TextEditor @saveValue="saveValue($event)" v-model:editorValue="value" />
</template>

<script>
import TextEditor from '@/components/shared/TextEditor.vue';
import CheckBoxControl from '@/components/shared/CheckBoxControl.vue';
import RadioButtonControl from '@/components/shared/RadioButtonControl.vue';
import SwitchButton from '@/components/shared/SwitchButton.vue'
import InputControl from '@/components/shared/InputControl.vue';
import DropdownControl from '@/components/shared/DropdownControl.vue';
import { ref } from 'vue';
export default {
  name: 'OverviewView',
  components: { TextEditor, CheckBoxControl, RadioButtonControl, SwitchButton, InputControl, DropdownControl },
  setup() {
    const value = ref('123');
    function saveValue(value) {
      console.log(value)
    }
    function checkboxClick(value) {
      console.log('checkboxClick', value)
    }
    function radioClick(value) {
      console.log('radioClick', value)
    }
    function switchButtonChange(value) {
      console.log('switchButton', value)
    }

    function dropdownChange(value) {
      console.log('dropdownChange',value)
    }
    return { value, saveValue, checkboxClick, radioClick, switchButtonChange, dropdownChange};
  }
}
</script>
<style scoped></style>