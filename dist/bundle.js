/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/logo.ts":
/*!********************************!*\
  !*** ./src/components/logo.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"HLHLogo\": () => (/* binding */ HLHLogo)\n/* harmony export */ });\nconst css = `\r\n<style>\r\n  .logo {\r\n  max-height: 100%;\r\n  min-width: 100%; }\r\n  .logo .a {\r\n    fill: none;\r\n    stroke-linecap: round;\r\n    stroke-miterlimit: 10;\r\n    stroke-width: 20px;\r\n    transition: stroke 0.3s ease-in-out, fill 0.3s ease-in-out;\r\n    fill: none;\r\n    stroke: #75c79e; }\r\n  .logo .b {\r\n    fill: #75c79e;\r\n    transition: fill 0.3s ease-in-out, fill 0.3s ease-in-out; }\r\n</style>\r\n`;\nconst template = document.createElement(\"template\");\ntemplate.innerHTML += `\r\n${css}\r\n<svg class='logo' xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 698 675.19\">\r\n  <title>Harlem Line Hustle Logo</title>\r\n  <defs>\r\n    <filter id=\"glow\" >\r\n      <feGaussianBlur stdDeviation=\"4\" result=\"coloredBlur\" />\r\n      <feMerge>\r\n        <feMergeNode in=\"coloredBlur\" />\r\n        <feMergeNode in=\"SourceGraphic\" />\r\n      </feMerge>\r\n    </filter>\r\n  </defs>\r\n  <path class=\"a\" d=\"M481.2,366.9a158.53,158.53,0,1,0-264,.5\" filter=\"url(#glow)\" />\r\n  <path class=\"a\"\r\n    d=\"M493.5,508.1C568.9,460.2,619,376,619,280,619,130.9,498.1,10,349,10S79,130.9,79,280A269.66,269.66,0,0,0,203.6,507.5\"\r\n    filter=\"url(#glow)\" />\r\n  <path class=\"a\"\r\n    d=\"M481.2,446A212.61,212.61,0,0,0,562,279c0-117.6-95.4-213-213-213S136,161.4,136,279a212.36,212.36,0,0,0,81.2,167.3\"\r\n    filter=\"url(#glow)\" />\r\n  <path class=\"b\"\r\n    d=\"M464,249.2a31.92,31.92,0,0,0-31.9-31.9H265.9A31.92,31.92,0,0,0,234,249.2V372.4H464ZM340.4,340.8a15.62,15.62,0,0,1-15.6,15.6H271a15.62,15.62,0,0,1-15.6-15.6V252.1A15.62,15.62,0,0,1,271,236.5h53.7a15.62,15.62,0,0,1,15.6,15.6v88.7Zm103,0a15.62,15.62,0,0,1-15.6,15.6H374a15.62,15.62,0,0,1-15.6-15.6V252.1A15.62,15.62,0,0,1,374,236.5h53.7a15.62,15.62,0,0,1,15.6,15.6v88.7Z\"\r\n    filter=\"url(#glow)\" />\r\n  <rect class=\"b\" x=\"234\" y=\"378.4\" width=\"230\" height=\"19.8\" filter=\"url(#glow)\" />\r\n  <path class=\"b\"\r\n    d=\"M440.1,466.4h-.5a32,32,0,0,0,24.7-31.1V404.2h-230v31.1A31.94,31.94,0,0,0,259,466.4h-.8l-90,116h45l13-20h246l12,20h46Zm-34.8-46.9A12.5,12.5,0,1,1,392.8,432,12.5,12.5,0,0,1,405.3,419.5Zm-113,0A12.5,12.5,0,1,1,279.8,432,12.5,12.5,0,0,1,292.3,419.5Zm-10.6,47.8h133l13.5,21.2h-158Zm-39.6,68.1,11-19h191l12,19Z\"\r\n    filter=\"url(#glow)\" />\r\n  <path class=\"b\" d=\"M42.85,617V661.2H34.14V643.26H14.4V661.2H5.7V617h8.7v17.82H34.14V617Z\" filter=\"url(#glow)\" />\r\n  <path class=\"b\"\r\n    d=\"M49.27,661.2l19.92-45.9h.48l19.92,45.9H79.51L66.79,628.92l6.3-4.32L57.85,661.2Zm13.62-16H76.15l3.06,7.32h-19Z\"\r\n    filter=\"url(#glow)\" />\r\n  <path class=\"b\"\r\n    d=\"M109.39,617a23.91,23.91,0,0,1,7.38,1.05,15.12,15.12,0,0,1,5.44,3,12.78,12.78,0,0,1,3.33,4.68,16,16,0,0,1,1.14,6.15,18.71,18.71,0,0,1-.81,5.4,14,14,0,0,1-2.64,4.92,13.21,13.21,0,0,1-4.84,3.57,18.12,18.12,0,0,1-7.44,1.35h-6.24v14H96V617Zm1.5,21.72a7.35,7.35,0,0,0,3.3-.66,5.63,5.63,0,0,0,2.07-1.68,6.91,6.91,0,0,0,1.08-2.13,7.29,7.29,0,0,0,.33-2.07,10.23,10.23,0,0,0-.21-1.83,7.16,7.16,0,0,0-.87-2.25,5.32,5.32,0,0,0-2-1.92,7.24,7.24,0,0,0-3.63-.78h-6.24v13.32Zm8.16,5.4,10.93,17H119.83l-11.16-16.8Z\"\r\n    filter=\"url(#glow)\" />\r\n  <path class=\"b\" d=\"M137.18,617h8.7V652.8h20.76v8.4H137.18Z\" filter=\"url(#glow)\" />\r\n  <path class=\"b\" d=\"M175.64,617h30.12v8.4H184.34v9.42h19v8.4h-19v9.54H206.6v8.4h-31Z\" filter=\"url(#glow)\" />\r\n  <path class=\"b\"\r\n    d=\"M215.61,661.2v-46h.06L240.21,650l-3.72-.84,24.48-34h.12v46h-8.7V634.86l.54,4.5L238,660.6h-.12l-15.36-21.24,1.5-4.14v26Z\"\r\n    filter=\"url(#glow)\" />\r\n  <path class=\"b\" d=\"M292,617h8.7V652.8h20.76v8.4H292Z\" filter=\"url(#glow)\" />\r\n  <path class=\"b\" d=\"M330.46,617h8.7V661.2h-8.7Z\" filter=\"url(#glow)\" />\r\n  <path class=\"b\"\r\n    d=\"M390.11,663l-33.49-30.24,2.58,1.44.18,27h-8.82V615.3h.36l32.77,30.12-1.93-.84L381.58,617h8.77v46Z\"\r\n    filter=\"url(#glow)\" />\r\n  <path class=\"b\" d=\"M401.75,617h30.12v8.4H410.45v9.42h19v8.4h-19v9.54h22.26v8.4h-31Z\" filter=\"url(#glow)\" />\r\n  <path class=\"b\" d=\"M498.36,617V661.2h-8.7V643.26H469.92V661.2h-8.71V617h8.71v17.82h19.74V617Z\"\r\n    filter=\"url(#glow)\" />\r\n  <path class=\"b\"\r\n    d=\"M517.56,644.88a7.22,7.22,0,0,0,1.26,4,9.78,9.78,0,0,0,3.33,3.12,8.87,8.87,0,0,0,4.53,1.2,9.47,9.47,0,0,0,8.13-4.32,7.34,7.34,0,0,0,1.23-4V617h8.58v28a15.62,15.62,0,0,1-2.4,8.61,16.73,16.73,0,0,1-6.48,5.88,19.28,19.28,0,0,1-9.06,2.13,19,19,0,0,1-9-2.13,16.78,16.78,0,0,1-6.45-5.88,15.62,15.62,0,0,1-2.4-8.61V617h8.7Z\"\r\n    filter=\"url(#glow)\" />\r\n  <path class=\"b\"\r\n    d=\"M578.71,627.72a33.22,33.22,0,0,0-5.13-2.28,15,15,0,0,0-4.89-.9,7.6,7.6,0,0,0-4.44,1.14,3.91,3.91,0,0,0-1.62,3.42,3.85,3.85,0,0,0,1.23,2.79,11.86,11.86,0,0,0,3.18,2.19,43.28,43.28,0,0,0,4.05,1.74,33.75,33.75,0,0,1,3.81,1.71,14.28,14.28,0,0,1,3.39,2.46,10.78,10.78,0,0,1,2.4,3.66,14.15,14.15,0,0,1,.9,5.37,11.85,11.85,0,0,1-1.74,6.24,12.68,12.68,0,0,1-5.1,4.65,17.6,17.6,0,0,1-8.28,1.77,26.62,26.62,0,0,1-15.13-4.74l3.85-6.78a21,21,0,0,0,3.39,2,20.54,20.54,0,0,0,3.69,1.35,13.77,13.77,0,0,0,3.42.48,11.53,11.53,0,0,0,3.15-.45,5.8,5.8,0,0,0,2.64-1.53,4.12,4.12,0,0,0,1-3,3.73,3.73,0,0,0-.87-2.4,9,9,0,0,0-2.34-2,19.11,19.11,0,0,0-3.21-1.56q-2-.78-4.2-1.8a21.6,21.6,0,0,1-4-2.49,10.8,10.8,0,0,1-4.24-9,12.6,12.6,0,0,1,1.72-6.66,12.15,12.15,0,0,1,4.83-4.47,16.8,16.8,0,0,1,7.2-1.83,24.92,24.92,0,0,1,8.67,1.26,30.28,30.28,0,0,1,6,3Z\"\r\n    filter=\"url(#glow)\" />\r\n  <path class=\"b\" d=\"M587.11,617h29.76v8.4H606.13V661.2h-8.7V625.44H587.11Z\" filter=\"url(#glow)\" />\r\n  <path class=\"b\" d=\"M625.27,617H634V652.8h20.77v8.4H625.27Z\" filter=\"url(#glow)\" />\r\n  <path class=\"b\" d=\"M663.74,617h30.12v8.4H672.44v9.42h19v8.4h-19v9.54H694.7v8.4h-31Z\" filter=\"url(#glow)\" />\r\n</svg>\r\n`;\nclass HLHLogo extends HTMLElement {\n    constructor() {\n        super();\n        this.attachShadow({ mode: \"open\" });\n        this.render();\n    }\n    render() {\n        var _a;\n        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(template.content.cloneNode(true));\n    }\n}\n\n\n//# sourceURL=webpack://harlem-line-hustle/./src/components/logo.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_logo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/logo */ \"./src/components/logo.ts\");\n\ncustomElements.define(\"hlh-logo\", _components_logo__WEBPACK_IMPORTED_MODULE_0__.HLHLogo);\nwindow.addEventListener(\"load\", () => {\n    var _a;\n    console.log('Hello World');\n    const stage = document.querySelector(\"#stage\");\n    const ctx = stage.getContext(\"2d\");\n    function reOffset() {\n        var BB = stage === null || stage === void 0 ? void 0 : stage.getBoundingClientRect();\n        offsetX = BB === null || BB === void 0 ? void 0 : BB.left;\n        offsetY = BB === null || BB === void 0 ? void 0 : BB.top;\n    }\n    function renderWindow() {\n        if (ctx) {\n            ctx.globalCompositeOperation = \"source-over\";\n            const contentRegion = document.querySelector(\".content\");\n            let { bottom, height, left, right, top, width } = contentRegion.getBoundingClientRect();\n            const { marginBottom, paddingLeft, paddingRight, marginTop, borderWidth } = window.getComputedStyle(contentRegion);\n            top = top - parseInt(marginTop, 10);\n            bottom = bottom + parseInt(marginBottom, 10);\n            const triangleLeftWidth = parseInt(paddingLeft, 10) * 0.75;\n            const triangleRightWidth = parseInt(paddingRight, 10) * 0.75;\n            const angleTop = parseInt(marginTop, 10) * 0.75;\n            const angleLeft = parseInt(marginBottom, 10) * 0.75;\n            // Draw dope border using our content region's CSS!\n            ctx.beginPath();\n            ctx.moveTo(left + parseInt(paddingLeft, 10), top);\n            ctx.lineTo(right - Math.ceil(width * 0.25) - 10, top);\n            ctx.lineTo(right - Math.ceil(width * 0.25) + 10, top + angleTop);\n            ctx.lineTo(right, top + angleTop);\n            ctx.lineTo(right, bottom - parseInt(paddingRight, 10));\n            ctx.lineTo(right - parseInt(paddingRight, 10), bottom);\n            ctx.lineTo(left + angleLeft, bottom);\n            ctx.lineTo(left + angleLeft, Math.ceil(height * 0.75) + 10);\n            ctx.lineTo(left, Math.ceil(height * 0.75) - 10);\n            ctx.lineTo(left, top + parseInt(paddingLeft, 10));\n            ctx.closePath();\n            ctx.strokeStyle = \"hsl(152, 41%, 52%)\";\n            ctx.lineWidth = parseInt(borderWidth, 10);\n            ctx.stroke();\n            ctx.fillStyle = \"hsla(205, 52%, 6%, 0.8)\";\n            ctx.fill();\n            // Draw dope corner triangles calculated off of padding!\n            ctx.beginPath();\n            ctx.moveTo(left, top);\n            ctx.lineTo(left + triangleLeftWidth, top);\n            ctx.lineTo(left, top + triangleLeftWidth);\n            ctx.closePath();\n            ctx.moveTo(right, bottom);\n            ctx.lineTo(right - triangleRightWidth, bottom);\n            ctx.lineTo(right, bottom - triangleRightWidth);\n            ctx.closePath();\n            ctx.fillStyle = \"hsla(152, 41%, 52%, 0.75)\";\n            ctx.fill();\n        }\n    }\n    let offsetX;\n    let offsetY;\n    const renderStage = () => {\n        const pattern = document.querySelector(\"#pattern\");\n        pattern.width = 96;\n        pattern.height = 86;\n        const pctx = pattern.getContext(\"2d\");\n        pctx.beginPath();\n        pctx.moveTo(48, 15);\n        pctx.lineTo(72, 29);\n        pctx.lineTo(72, 57);\n        pctx.lineTo(48, 71);\n        pctx.lineTo(24, 57);\n        pctx.lineTo(24, 29);\n        pctx.lineTo(48, 15);\n        pctx.moveTo(0, 15);\n        pctx.lineTo(24, 29);\n        pctx.moveTo(0, 71);\n        pctx.lineTo(24, 57);\n        pctx.moveTo(0, 71);\n        pctx.moveTo(48, 15);\n        pctx.lineTo(48, 0);\n        pctx.moveTo(48, 71);\n        pctx.lineTo(48, 86);\n        pctx.moveTo(72, 29);\n        pctx.lineTo(95, 15);\n        pctx.moveTo(72, 57);\n        pctx.lineTo(95, 71);\n        pctx.moveTo(95, 71);\n        pctx.lineTo(95, 86);\n        pctx.moveTo(95, 15);\n        pctx.lineTo(95, 0);\n        pctx.strokeStyle = \"hsl(153, 40%, 30%)\";\n        pctx.shadowBlur = 5;\n        pctx.shadowColor = \"#FFF\";\n        pctx.stroke();\n        stage.height = window.innerHeight;\n        stage.width = window.innerWidth;\n        const texture = ctx.createPattern(pattern, \"repeat\");\n        ctx.fillStyle = texture;\n        ctx.fillRect(0, 0, stage.width, stage.height);\n        const gradient = ctx.createLinearGradient(0, 0, 0, stage.height); // Add three color stops\n        gradient.addColorStop(0, \"hsla(153, 40%, 30%, 0.1)\");\n        gradient.addColorStop(0.5, \"hsla(152, 41%, 52%, 1)\");\n        gradient.addColorStop(1, \"hsla(153, 40%, 30%, 0.1)\"); // Set the fill style and draw a rectangle\n        ctx.fillStyle = gradient;\n        ctx.globalCompositeOperation = \"source-in\";\n        ctx.fillRect(0, 0, stage.width, stage.height);\n    };\n    reOffset();\n    function draw(cx, cy, radius) {\n        const alphas = [0.95, 0.9, 0.5, 0.25, 0.1, 0];\n        const HSL = [159, 56, 7];\n        ctx.save();\n        renderStage();\n        ctx.globalCompositeOperation = \"lighter\";\n        const radialGradient = ctx.createRadialGradient(cx, cy, 1, cx, cy, radius);\n        const len = alphas.length - 1;\n        alphas.forEach((a, i) => {\n            radialGradient.addColorStop(i / len, `hsla(${HSL[0]},${HSL[1]}%,${HSL[2]}%,${a})`);\n        });\n        ctx.beginPath();\n        ctx.arc(cx, cy, radius, 0, Math.PI * 2, false);\n        ctx.fillStyle = radialGradient;\n        ctx.fill();\n        ctx.stroke;\n        renderWindow();\n    }\n    function mouseMove(e) {\n        e.preventDefault();\n        e.stopPropagation();\n        const mouseX = Math.ceil(e.clientX - offsetX);\n        const mouseY = Math.ceil(e.clientY - offsetY);\n        draw(mouseX, mouseY, stage.width / 2);\n    }\n    draw(stage.width / 2, stage.height / 2, stage.width / 2);\n    window.addEventListener(\"mousemove\", mouseMove, false);\n    window.addEventListener(\"resize\", (event) => {\n        reOffset();\n        draw(stage.width / 2, stage.height / 2, stage.width / 2);\n    });\n    (_a = document\n        .querySelector(\".content\")) === null || _a === void 0 ? void 0 : _a.addEventListener(\"resize\", () => {\n        reOffset();\n        draw(stage.width / 2, stage.height / 2, stage.width / 2);\n    });\n});\n\n\n//# sourceURL=webpack://harlem-line-hustle/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;