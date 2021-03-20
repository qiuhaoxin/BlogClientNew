import RcUpload from 'rc-upload';
import React from 'react';

function Upload({onCallback}){
    const params={
        action:'/api/blog/upload',
        method:'POST',
        access:'image/*',
        multiple: true,
        onStart(file) {
          console.log('onStart', file, file.name);
        },
        onSuccess(ret) {
            const {imgPath,errcode}=ret;
            console.log("errocde ksdfj si ",errcode);
            onCallback && onCallback(ret);
        },
        onError(err) {
          console.log('onError', err);
          onCallback && onCallback(err);
        },
    }
    return <RcUpload {...params}>
        <span style={{cursor:'pointer',color:'#999',padding:'4px 10px'}}>picture</span>
    </RcUpload>
}

export default Upload;