import axios from 'axios'
import store from '@/common/store'
//import router, { loginUrl } from '@/common/router'
import { Toast } from 'cube-ui'
import qs from 'qs'


const instance = axios.create({
})



instance.interceptors.response.use(response => {

    if (response.status === 200) {
        let { status, msg, data } = response.data;
        if (status == '200') {
            let _data = {
                _status: status,
                _msg: msg
            }
            return Object.assign(_data, data);
        } else {
            //return Promise.reject(response.data);
            let toast = Toast.$create({
                txt: msg,
                type: 'txt',
                time: 1500
            })
            toast.show();
        }
    } else {
        //alert(response.status);
    }
}, error => {
    if (!error.response) {
        //alert('网络异常,请检查网络');
    } else {
        //alert('请求失败');
    }
    return Promise.reject(error.response);
})

export const post = (api, data) => {
    addheadertoken();    
    if (!(data instanceof FormData)) {
        data = qs.stringify(data)
    }
    return new Promise((resolve, reject) => {
        instance.post(api, data).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

export const get = (api, data) => {
    addheadertoken();
    // data = addCurrentUserParam(data);
    return new Promise((resolve, reject) => {
        instance.get(api, { params: data }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

const addheadertoken=()=>{    
    if(!instance.defaults.headers.common['token']){        
        let token = store.state.user.token;
        if (token) {
            instance.defaults.headers.common['token'] = token;
        }
    }
}

const addCurrentUserParam = (data = {}) => {
    const token = store.state.user.token;
    if (token) {
        if (data instanceof FormData) {
            data.append('token', token)
        } else {
            data.token = token
        }
    }
    return data
}