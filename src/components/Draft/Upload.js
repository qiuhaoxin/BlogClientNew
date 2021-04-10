import RcUpload from 'rc-upload';
import React from 'react';
export function checkImageWH(file, width, height) { // 参数分别是上传的file，想要限制的宽，想要限制的高
  return new Promise(function(resolve, reject) {
    let fileReader = new FileReader();
    fileReader.onload = e => {
      let src = e.target.result;
      const image = new Image();
      image.onload = function() {
          resolve({
              width:this.width,
              height:this.height,
          });
      };
      image.onerror = reject;
      image.src = src;
    };
    fileReader.readAsDataURL(file);
  });
}

export function preLoadImage(imgSrc){
    if(!imgSrc)return Promise.reject("图片路径非法!")
    return new Promise((resolve,reject)=>{
      let img=new Image();
      img.onload=function(){
        resolve({
            width:this.width,
            height:this.height,
          })
      }
      img.onerror=reject;
      img.src=imgSrc;
    })

}
/**
 * 
 * @param {*} onCallback
 * @param {*} mode //模式 0：只能选择图片     1：可重选，可编辑 
 * @returns 
 */
function Upload({onCallback,uploadPath,iconSize}){
    let imgRect=null;
    let imgName='';
    const params={
        action:uploadPath || '/api/blog/upload',
        method:'POST',
        access:'image/*',
        multiple: true,
        onStart(file) {
          imgName=file.name;
          checkImageWH(file).then(rect=>{
              imgRect=rect;
          })
        },
        onSuccess(ret) {
            const {imgPath,errcode}=ret;
            onCallback && onCallback({
              code:0,
              imgPath,
              imgRect,
              imgName
            });
        },
        onError(err) {
          onCallback && onCallback({
            code:1,
            imgPath:null,
            imgRect:null,
            imgName,
          });
        },
    }
    return <RcUpload {...params} style={{outline:'none'}}>
        <span style={{cursor:'pointer',color:'#999',padding:'4px 10px'}}>
          <i className="icon-photo" style={{fontSize:iconSize}}></i>
        </span>
    </RcUpload>
}
export default Upload;