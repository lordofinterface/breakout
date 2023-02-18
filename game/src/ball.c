#include "ball.h"
#include <stdint.h>
#include <stdlib.h>
#include "paddle.h"
#include "wasm4.h"

#define IS_BALL_COLLIDE_BY_AXIS(ball_coord, obj_coord, obj_length)\
  (ball_coord + BALL_SIZE - obj_coord > 0 && obj_coord + obj_length - ball_coord > 0)

#define IS_BALL_HIT_BOTTOM(ball_y, y, h) (ball_y + BALL_SIZE >= y && ball_y + BALL_SIZE < y + h)
#define IS_BALL_HIT_TOP(ball_y, y, h) (ball_y <= y + h && ball_y > y)

#define IS_BALL_HIT_LEFT(ball_x, x, w) (ball_x <= x + w && ball_x > x)
#define IS_BALL_HIT_RIGHT(ball_x, x, w) (ball_x + BALL_SIZE >= x && ball_x + BALL_SIZE < x + w)

void ball_reflect(struct ball *ball, int16_t x, int16_t y, int16_t w, int16_t h) {
  if (IS_BALL_HIT_BOTTOM(ball->y, y, h) && IS_BALL_COLLIDE_BY_AXIS(ball->x, x, w)) {
    ball->dy = (int16_t) -abs(ball->dy);
  }

  if (IS_BALL_HIT_TOP(ball->y, y, h) && IS_BALL_COLLIDE_BY_AXIS(ball->x, x, w)) {
    ball->dy = (int16_t) abs(ball->dy);
  }

  if (IS_BALL_HIT_LEFT(ball->x, x, w) && IS_BALL_COLLIDE_BY_AXIS(ball->y, y, h)) {
    ball->dx = (int16_t) abs(ball->dx);
  }

  if (IS_BALL_HIT_RIGHT(ball->x, x, w) && IS_BALL_COLLIDE_BY_AXIS(ball->y, y, h)) {
    ball->dx = (int16_t) -abs(ball->dx);
  }
};

void ball_update(struct ball *ball, struct paddle *paddle) {
  if (ball->x + BALL_SIZE >= SCREEN_SIZE) ball->dx = (int16_t) -abs(ball->dx);
  if (ball->x < 0) ball->dx = (int16_t) abs(ball->dx);

  if (ball->y + BALL_SIZE > SCREEN_SIZE) ball->dy = (int16_t) -abs(ball->dy);
  if (ball->y < 0) ball->dy = (int16_t) abs(ball->dy);

  ball_reflect(ball, paddle->x, PADDLE_Y, PADDLE_W, PADDLE_H);

  ball->x += ball->dx;
  ball->y += ball->dy;

  *DRAW_COLORS = 0x22;
  oval(ball->x, ball->y, BALL_SIZE, BALL_SIZE);
};
