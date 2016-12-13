/**
 * Created by zad on 16/12/13.
 */
export default class Motion {
  // 线性
  static linear(k) {
    return k;
  }

  // 二次方
  static quadraticIn(k) {
    return k * k;
  }

  static quadraticOut(k) {
    return k * (2 - k);
  }

  static quadraticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k;
    }
    return -0.5 * (--k * (k - 2) - 1);
  }

  // 三次方
  static cubicIn(k) {
    return k * k * k;
  }

  static cubicOut(k) {
    return --k * k * k + 1;
  }

  static cubicInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k + 2);
  }

  // 四次方
  static quarticIn(k) {
    return k * k * k * k;
  }

  static quarticOut(k) {
    return 1 - (--k * k * k * k);
  }

  static quarticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k;
    }
    return -0.5 * ((k -= 2) * k * k * k - 2);
  }

  // 五次方
  static quinticIn(k) {
    return k * k * k * k * k;
  }

  static quinticOut(k) {
    return --k * k * k * k * k + 1;
  }

  static quinticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k * k * k + 2);
  }

  // 正弦
  static sinusoidalIn(k) {
    return 1 - Math.cos(k * Math.PI / 2);
  }

  static sinusoidalOut(k) {
    return Math.sin(k * Math.PI / 2);
  }

  static sinusoidalInOut(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
  }

  // 指数
  static exponentialIn(k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
  }

  static exponentialOut(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
  }

  static exponentialInOut(k) {
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if ((k *= 2) < 1) {
      return 0.5 * Math.pow(1024, k - 1);
    }
    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
  }

  // 圆
  static circularIn(k) {
    return 1 - Math.sqrt(1 - k * k);
  }

  static circularOut(k) {
    return Math.sqrt(1 - (--k * k));
  }

  static circularInOut(k) {
    if ((k *= 2) < 1) {
      return -0.5 * (Math.sqrt(1 - k * k) - 1);
    }
    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
  }

  // 脉冲
  static elasticIn(k) {
    let s;
    let a = 0.1;
    const p = 0.4;
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    }
    else {
      s = p * Math.asin(1 / a) / (2 * Math.PI);
    }
    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
  }

  static elasticOut(k) {
    let s;
    let a = 0.1;
    const p = 0.4;
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    }
    else {
      s = p * Math.asin(1 / a) / (2 * Math.PI);
    }
    return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
  }

  static elasticInOut(k) {
    let s;
    let a = 0.1;
    const p = 0.4;
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    }
    else {
      s = p * Math.asin(1 / a) / (2 * Math.PI);
    }
    if ((k *= 2) < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    }
    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

  }

  // 返回
  static backIn(k) {
    const s = 1.70158;
    return k * k * ((s + 1) * k - s);
  }

  static backOut(k) {
    const s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
  }

  static backInOut(k) {
    const s = 1.70158 * 1.525;
    if ((k *= 2) < 1) {
      return 0.5 * (k * k * ((s + 1) * k - s));
    }
    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
  }

  // 弹跳
  static bounceIn(k) {
    return 1 - Motion.bounceOut(1 - k);
  }

  static bounceOut(k) {
    if (k < (1 / 2.75)) {
      return 7.5625 * k * k;
    }
    else if (k < (2 / 2.75)) {
      return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
    }
    else if (k < (2.5 / 2.75)) {
      return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
    }
    else {
      return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
    }
  }

  static bounceInOut(k) {
    if (k < 0.5) {
      return Motion.bounceIn(k * 2) * 0.5;
    }
    return Motion.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  }
}
