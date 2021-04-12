//是否已经包含要加载的脚本，不用重新加载了
export function isExistsScript(src){
    let headScripts=document.getElementsByTagName('head')[0];
    let scriptDoms=headScripts.querySelectorAll('script');
    scriptDoms=Array.prototype.slice.call(scriptDoms);
    const result=scriptDoms.some(item=>{
        return item.src==src;
    });
    return result;
}
export function loadScriptDynamic(src){
    // if(isExistsScript(src))return;
    let scriptDom=document.createElement('script');
    scriptDom.onload=function(){
        console.log("脚本下载完成!");
    }
    scriptDom.onerror=function(){
        console.error("脚本加载有问题!");
    }
    scriptDom.src=src;
    scriptDom.type="text/javascript";
    scriptDom.async=true;
    document.getElementsByTagName('head')[0].appendChild(scriptDom);
}
/**
 *  <p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="qiuhaoxin" data-slug-hash="VwPQwgJ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="position">
            <span>See the Pen <a href="https://codepen.io/qiuhaoxin/pen/VwPQwgJ">
            position</a> by qiuhaoxin (<a href="https://codepen.io/qiuhaoxin">@qiuhaoxin</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
        </p>
        <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
 * @param {*} str 
 */
//从字符串中提取<script>脚本中的src属性的值
export function exactSrcFromScript(str){
    const scriptScrReg=/[\S]*\s*\<script\s*([\S]+)\s*src=\"([\S]+)\"\>\<\/script\>/;
    const result=scriptScrReg.exec(str);
    if(result && result.length > 2){
        return result[2];
    }
    return null;
}