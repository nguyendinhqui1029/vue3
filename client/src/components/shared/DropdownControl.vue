<template>
    <div class="dropdown-wrapper">
      <InputControl 
        @focusin="openOption(); inputFocusIn();" 
        :label="label" 
        :isDisabled="isDisabled" 
        type="text" 
        :placeholder="placeholder"
        :modelValue="covertListToString" 
        @update:modelValue="filterOption($event)"/>
      <div class="options-wrapper" v-if="isOpen">
        <ul class="options">
          <li class="option-item" v-for="option in optionList.options" :key="option.id">
            <CheckBoxControl v-if="multiple" :content="option.id" :value="option.selected" @checkboxClick="optionClick($event)" :label="option.name" />
            <span class="single" v-if="!multiple" @click="optionClick({checked: !option.selected , value: option.id })">{{ option.name }}</span>
            <vue-feather class="single-item-selected" v-if="option.selected && !multiple" type="check"></vue-feather>
          </li>
        </ul>
      </div>
    </div>
    <div class="container" v-if="isOpen" @click="closeSelectOption()"></div>
</template>
<script>
import InputControl from '@/components/shared/InputControl.vue';
import CheckBoxControl from '@/components/shared/CheckBoxControl.vue';
import { ref, reactive } from 'vue';
export default {
  name: 'DropdownControl',
  props: {
    placeholder: {
      type: String
    },
    label: {
      type: String,
      require: true
    },
    initialValue: Array,
    options:{
      type: Array,
      require: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["dropdownChange"],
  components: { InputControl, CheckBoxControl },
  setup(props, content){
    const isOpen = ref(false);
    const optionList = reactive({ options: props.options.map(option=>({
      ...option, 
      selected: props.initialValue.findIndex(optionItem=>optionItem == option.id) >= 0}))});
    const optionFilterList = reactive({ options: optionList.options});
    const displayValue = reactive({ value: optionList.options.filter(item=>item.selected).map(item=>item.name) });

    function optionClick(optionSelected) {
      let selectedItem = [];
      if(props.multiple) {
        optionList.options = optionList.options.map(item=>({
            ...item, 
            selected: item.id == optionSelected.value ? optionSelected.checked : item.selected}));
        optionFilterList.options = optionFilterList.options.map(item=>({
            ...item, 
            selected: item.id == optionSelected.value ? optionSelected.checked : item.selected}));
        selectedItem = optionFilterList.options.filter(option=>option.selected);
        displayValue.value = selectedItem.map(item=>item.name);
      }else {
        optionList.options = optionList.options.map(item=>({
            ...item, 
            selected: item.id == optionSelected.value}));
        optionFilterList.options = optionFilterList.options.map(item=>({...item, selected: item.id == optionSelected.value}));
        selectedItem = optionList.options.filter(option=>option.selected);
        displayValue.value = selectedItem.map(item=>item.name);
        this.closeSelectOption();
      }
      
      content.emit('dropdownChange',selectedItem);
    }
    function openOption() {
      if(!this.isDisabled) {
        isOpen.value = true;
      }
    }

    function filterOption(value) {  
      optionList.options = [...optionFilterList.options].filter(option=>option.name.toLowerCase().includes(value.toLowerCase()));
    }

    function inputFocusIn() {
      displayValue.value = [];
    }
    function closeSelectOption() {
      displayValue.value = optionFilterList.options.filter(option=>option.selected).map(item=>item.name);
      isOpen.value = false;
      optionList.options = [...optionFilterList.options];
    }
    return { isOpen, optionList, displayValue, optionFilterList, filterOption, optionClick, openOption, inputFocusIn, closeSelectOption };
  },
  computed: {
    covertListToString() {
        return this.displayValue.value.join('; ');
      }
    }
}
</script>

<style scoped>
.single-item-selected {
  color: var(--primary-color);
}
.single {
  height: 25px;
  display: flex;
  flex: 1;
  align-items: center;
  padding: 2px 10px;
  cursor: pointer;
}
.option-item {
  display: flex;
}
.options {
  list-style: none;
  margin: 0;
  padding: 0;
}
.dropdown-wrapper {
  position: relative;
}

.options-wrapper {
  position: absolute;
  width: 100%;
  min-height: 30px;
  background: #ffff;
  z-index: 1001;
  box-sizing: border-box;
  padding: 16px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 10px 10px 10px var(--three-color);
  box-shadow: 0px 2px 3px grey;
}
.container {
  position: absolute;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
 .disabled {
  opacity: 0.5;
  cursor: default;
 }
</style>
