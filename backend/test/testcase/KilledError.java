public class Main {
  public static void main(String[] args) {
    timeoutTest();
  }

  private static void timeoutTest() {
    boolean a = true;
    while (true) {
      a = !a;
    }
  }
}