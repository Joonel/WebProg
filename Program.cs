using System.Text.Json;

namespace RocketLaunches
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Enter a keyword to search for rocket launches:");
            string keyword = Console.ReadLine();

            var httpClient = new HttpClient();
            var response = await httpClient.GetAsync($"https://ll.thespacedevs.com/2.2.0/launch/?mode=list&search={keyword}");
            var responseContent = await response.Content.ReadAsStringAsync();

            var launches = JsonSerializer.Deserialize<Launches>(responseContent);

            if (launches.Count > 0)
            {
                Console.WriteLine();
                foreach (var launch in launches.Results)
                {
                    Console.WriteLine($"{launch.Name} - {launch.Net}");
                }
            }
            else
                Console.WriteLine("Rocket launches were not found.");

            Console.ReadLine();
        }
    }

    public class Launch
    {
        public string? Name { get; set; }
        public string? Net { get; set; }
    }

    public class Launches
    {
        public int Count { get; set; }
        public Launch[]? Results { get; set; }
    }
}
