#pragma once
#include "paddle.h"
#include <stdint.h>
#include <stdbool.h>

#define BALL_SIZE 8 

struct ball {
  int16_t x;
  int16_t y;
  int16_t dx;
  int16_t dy;
};

void ball_update(struct ball *ball, struct paddle *paddle);
