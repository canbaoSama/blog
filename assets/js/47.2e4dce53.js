(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{783:function(n,t,e){"use strict";e.r(t);e(134);var r={data:function(){return{}},mounted:function(){var n=new this.BinaryTree;[8,2,4,5,7,13,11,9,14].forEach((function(t){return n.insert(t)}));n.inOrderTraverse((function(n){console.log(n)}))},methods:{BinaryTree:function(){var n=function(n){this.key=n,this.right=null,this.left=null},t=null;this.insert=function(e){var r=new n(e);null===t?t=r:function n(t,e){e.key<t.key?null===t.left?t.left=e:n(t.left,e):null===t.right?t.right=e:n(t.right,e)}(t,r)};var e=function n(t,e){null!==t&&(n(t.left,e),e(t.key),n(t.right,e))};this.inOrderTraverse=function(n){e(t,n)};this.preOrderTraverse=function(n){!function(n,t){null!==n&&(t(n.key),e(n.left,t),e(n.right,t))}(t,n)};this.postOrderTraverse=function(n){!function(n,t){null!==n&&(t(n.key),e(n.left,t),e(n.right,t))}(t,n)}}}},i=e(31),l=Object(i.a)(r,(function(){var n=this.$createElement;return(this._self._c||n)("div")}),[],!1,null,null,null);t.default=l.exports}}]);