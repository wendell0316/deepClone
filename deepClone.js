function deepClone(obj) {
    if (obj == null || typeof obj !== 'object') {
      return obj;
    }
  
    switch (Object.prototype.toString.call(obj)) {
      case '[object Array]': {
        const result = new Array(obj.length);
        for (let i=0; i<result.length; ++i) {
          result[i] = deepClone(obj[i]);
        }
        return result;
      }
  
      // Object.prototype.toString.call(new XxxError) returns '[object Error]'
      case '[object Error]': {
        const result = new obj.constructor(obj.message);
        result.stack = obj.stack; // hack...
        return result;
      }
  
      case '[object Date]':
      case '[object RegExp]':
      case '[object Int8Array]':
      case '[object Uint8Array]':
      case '[object Uint8ClampedArray]':
      case '[object Int16Array]':
      case '[object Uint16Array]':
      case '[object Int32Array]':
      case '[object Uint32Array]':
      case '[object Float32Array]':
      case '[object Float64Array]':
      case '[object Map]':
      case '[object Set]':
        return new obj.constructor(obj);
  
      case '[object Object]': {
        const keys = Object.keys(obj);
        const result = {};
        for (let i=0; i<keys.length; ++i) {
          const key = keys[i];
          result[key] = deepClone(obj[key]);
        }
        return result;
      }
  
      default: {
        throw new Error("Unable to copy obj! Its type isn't supported.");
      }
    }
   }
