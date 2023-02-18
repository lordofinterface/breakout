#pragma once
#include <stdint.h>

#define PADDLE_W 30
#define PADDLE_H 8
#define PADDLE_Y 150

struct paddle {
  int16_t x;
  float dx;
};

void paddle_update(struct paddle *paddle);
