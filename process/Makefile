TARGET=run
CC=gcc
CFLAGS=-Wall
OBJS=run.c

$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^

exec: exec.c
	$(CC) $(CFLAGS) -o $@ $^

clean: 
	rm $(TARGET) input result emission