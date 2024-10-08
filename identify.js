const identifyDotJS = {};
identifyDotJS.gatherCharCode=(function(o){let t={};for(let r in o)if(o.hasOwnProperty(r)){let n=o[r];"string"==typeof n?t[r]=Array.from(n).map(o=>o.charCodeAt(0)).join(""):"number"==typeof n?t[r]=n.toString().split("").map(o=>o.charCodeAt(0)).join(""):t[r]=n}return t});
identifyDotJS.getGPUInfo=(function(){var e,t=document.createElement("canvas");try{e=t.getContext("webgl")||t.getContext("experimental-webgl")}catch(e){return null}if(!e)return null;var r=e.getExtension("WEBGL_debug_renderer_info");return r?{vendor:e.getParameter(r.UNMASKED_VENDOR_WEBGL),renderer:e.getParameter(r.UNMASKED_RENDERER_WEBGL)}:null});
identifyDotJS.compressObj=(function(n){let t="";for(let o in n)if(n.hasOwnProperty(o)){let r=n[o];null!==r&&void 0!==r&&(t+=r.toString())}return t});
identifyDotJS.hash=(async function(input){return (Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',(new TextEncoder()).encode(input)))).map(byte=>byte.toString(16).padStart(2,'0')).join('')).substring(0,256)});
identifyDotJS.gatherDeviceInfo=(function(){
	let deviceInfo={
            	platform: navigator.platform,
            	deviceMemory: navigator.deviceMemory,
            	GPU: navigator.gpu.wgslLanguageFeatures.size,
            	maxTouchPoints: navigator.maxTouchPoints,
            	browserLanguage: navigator.language,
            	CPUCores: navigator.hardwareConcurrency,
            	GPUrenderer: identifyDotJS.getGPUInfo().renderer,
		GPUvendor: identifyDotJS.getGPUInfo().vendor,
		userAgent: navigator.userAgent
	};
	return deviceInfo;
});
identifyDotJS.getFingerprint = async function(){
	return (identifyDotJS.hash(identifyDotJS.compressObj(identifyDotJS.gatherCharCode(identifyDotJS.gatherDeviceInfo()))));
};
