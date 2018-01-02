import Dog from './dog';
import showVersion from './version';
import Counter from './counter';
import initForm from './form';
import { updateMeter, updateResetButton } from './ui';

const counter = new Counter();

$('#extend').click(() => {
  counter.add();
});

$('#twitter').click(() => {
  open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`すっぱいぬ🐶を${counter.count}回伸ばしました！ https://hibikine.me/dog/ #のびるすっぱいぬ`)}`, '_blank');
});

initForm(counter);
counter.addEventListener(updateMeter);
counter.addEventListener(updateResetButton);
showVersion();

const dog = new Dog();
function mainLoop() {
  dog.updateDog(counter.count);
  dog.drawDog();
  window.requestAnimationFrame(() => {
    mainLoop();
  });
}
mainLoop();

