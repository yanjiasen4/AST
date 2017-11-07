import static org.junit.Assert.*;


import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class TransformerTest {
	
	Transformer trans = new Transformer();
	
	String bPosIntCase = "1101";
	String bPosDecCase = "110.011";
	
	String oPosIntCase = "5302";
	String oPosDecCase = "430.045";
	
	String hPosIntCase = "173";
	String hPosDecCase = "113.8";
	
	String zeroCase = "0";

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}
	
	@Test
	public void testbtod() {
		assertEquals("testing binary postive integer to decimal", 13, trans.btod(bPosIntCase), 0);
		assertEquals("testing binary postive decimal to decimal", 6.375, trans.btod(bPosDecCase), 0);
		assertEquals("testing binary zero to decimal", 0, trans.btod(zeroCase), 0);	
	}
	
	@Test
	public void testotod() {
		assertEquals("testing octonary postive integer to decimal", 2754, trans.otod(oPosIntCase), 0);
		assertEquals("testing octonary postive decimal to decimal", 280.072265625, trans.otod(oPosDecCase), 0);
		assertEquals("testing octonary zero to decimal", 0, trans.otod(zeroCase), 0);	
	}
	
	@Test
	public void testhtod() {
		assertEquals("testing hexadecimal postive integer to decimal", 371, trans.htod(hPosIntCase), 0);
		assertEquals("testing hexadecimal postive decimal to decimal", 275.5, trans.htod(hPosDecCase), 0);
		assertEquals("testing hexadecimal zero to decimal", 0, trans.htod(zeroCase), 0);	
	}

}
