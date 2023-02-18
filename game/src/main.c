#include "wasm4.h"
#include "ball.h"
#include "paddle.h"
#include <stdbool.h>

struct ball ball = { 0, SCREEN_SIZE / 2, 2, 2 };
struct paddle paddle = { 30, 0 };

void start () {
  PALETTE[0] = 0xff7d6e;
  PALETTE[1] = 0xfca6ac;
  PALETTE[2] = 0xe8e7cb;
  PALETTE[3] = 0x2176cc;
};

void update () {
  paddle_update(&paddle);
  ball_update(&ball, &paddle);
}
