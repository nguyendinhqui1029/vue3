<template>
 <QuillEditor v-model:content="content" :modules="modules" theme="snow" toolbar="#toolbar">
  <template #toolbar>
    <div id="toolbar">
      <select class="ql-header">
        <option :value="1"></option>
        <option :value="2"></option>
        <option :value="3"></option>
        <option :value="4"></option>
        <option :value="5"></option>
        <option :value="6"></option>
        <option selected></option>
      </select>
      <select class="ql-size">
        <option value="small"></option>
        <option selected></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select>
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>
      <button class="ql-strike"></button>
      <button class="ql-script" value="sub"></button>
      <button class="ql-script" value="super"></button>
      <button class="ql-script" value="super"></button>

      <select class="ql-align">
        <option selected></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>

      <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>
      <button class="ql-blockquote"></button>
      <button class="ql-code-block"></button>
      <button class="ql-link"></button>
      <button class="ql-image"></button>
      <button class="ql-video"></button>
      <select class="ql-background">
        <option value="#e60000"></option>
        <option value="#93f"></option>
        <option value="#2563eb"></option>
        <option value="#4b5563"></option>
        <option value="#dbeafe"></option>
        <option value="#f8f8f2"></option>
        <option value="#0b81ff"></option>
        <option value="#06c"></option>
        <option value="#008a00"></option>
        <option value="#000000" selected></option>
        <option value="#ff0"></option>
        <option value="#f90"></option>
        <option value="#d1d5db"></option>
      </select>
      <select class="ql-color">
        <option value="#e60000"></option>
        <option value="#93f"></option>
        <option value="#2563eb"></option>
        <option value="#4b5563"></option>
        <option value="#dbeafe"></option>
        <option value="#f8f8f2"></option>
        <option value="#0b81ff"></option>
        <option value="#06c"></option>
        <option value="#008a00"></option>
        <option value="#000000" selected></option>
        <option value="#ff0"></option>
        <option value="#f90"></option>
        <option value="#d1d5db"></option>
      </select>
      <select class="ql-font">
        <option class="ql-font-roboto" selected>Roboto</option>
        <option :value="'ql-font-sans-serif '">Sans serif</option>
      </select>
      
      <button id="#save" @click="saveEvent()">Save</button>
  </div>
  </template>
 </QuillEditor>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill';
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.core.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { ref } from 'vue';
export default {
  name: 'TextEditor',
  components: { QuillEditor },
  props: {
    editorValue: String
  },
  setup(props, context){
    const content = ref(props.editorValue)
    const modules = {
      name: 'blotFormatter',
      module: BlotFormatter,
    }
    function saveEvent() {
      context.emit('saveValue', QuillEditor.root.innerHTML)
    }
    return {modules, content, saveEvent};
  }
}
</script>
<style scoped>
.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
    border-color: #d1d5db;
    right: 0;
}
.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
    border-color: #d1d5db;
    right: 0;
}
.ql-snow .ql-tooltip {
    position: absolute;
    transform: translate(80%, 25px);
}
</style>
