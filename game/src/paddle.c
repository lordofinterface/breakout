#include "wasm4.h"
#include "paddle.h"
#include <stdint.h>

void paddle_update(struct paddle *paddle) {
  if (*GAMEPAD1 & BUTTON_RIGHT) {
    if (paddle->dx < 3) paddle->dx += (float) 0.5;
  } else if (*GAMEPAD1 & BUTTON_LEFT) {
   if (paddle->dx > -3)  paddle->dx -= (float) 0.5;
  } else {
    paddle->dx /= (float) 1.3;
  }

  paddle->x += (int16_t) paddle->dx;

  if (paddle->x <= 0) paddle->x = 0;
  if (paddle->x > SCREEN_SIZE - PADDLE_W) paddle->x = SCREEN_SIZE - PADDLE_W;

  *DRAW_COLORS = 0x31;
  rect((uint16_t) paddle->x, PADDLE_Y, PADDLE_W, PADDLE_H);
};
