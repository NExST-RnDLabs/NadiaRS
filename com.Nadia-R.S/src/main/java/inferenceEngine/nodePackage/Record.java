package inferenceEngine.nodePackage;

public class Record {
	private String name;
	private int trueCount;
    private int falseCount;
	 
    public Record()
    {
    		name = "";
    		trueCount=0;
    		falseCount=0;
    }
    public Record(String name, int trueCount, int falseCount)
    {
    		this.name = name;
        this.trueCount = trueCount;
        this.falseCount = falseCount;
    }
    
    public void setName(String name)
    {
    		this.name = name;
    }
    public String getName()
    {
    		return this.name;
    }
    
    public void setTrueCount(int trueCount)
    {
        this.trueCount = trueCount;
    }
    public void addTrueCount(int trueCount)
    {
        this.trueCount += trueCount;
    }
    public void incrementTrueCount()
    {
        this.trueCount++;
    }
    public int getTrueCount()
    {
        return this.trueCount;
    }
    
    public void setFalseCount(int falseCount)
    {
        this.falseCount = falseCount;
    }
    public void addFalseCount(int falseCount)
    {
        this.falseCount += falseCount;
    }
    public void incrementFalseCount()
    {
        this.falseCount++;
    }
    public int getFalseCount()
    {
        return this.falseCount;
    }
}
