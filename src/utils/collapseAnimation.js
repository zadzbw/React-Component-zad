/**
 * Created by zad on 17/1/16.
 */
import velocity from 'velocity-animate';

const duration = 400;
const easing = [0.08, 0.82, 0.17, 1];

const collapseAnimation = {
  enter(node, done) {
    velocity(node, 'slideDown', {
      duration,
      easing,
      opacity: 0.5,
      complete(){
        done();
      },
    });
    return {
      stop() {
        velocity(node, 'finish');
        done();
      },
    };
  },
  leave(node, done) {
    velocity(node, 'slideUp', {
      duration,
      easing,
      complete(){
        done();
      },
    });
    return {
      stop() {
        velocity(node, 'finish');
        done();
      },
    };
  },
};

export default collapseAnimation;
