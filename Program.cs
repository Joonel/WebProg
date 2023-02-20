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
            var response = await httpClient.GetAsync("https://ll.thespacedevs.com/2.2.0/launch/?mode=list&search=" + keyword);
            var responseContent = await response.Content.ReadAsStringAsync();

            var launches = JsonSerializer.Deserialize<Launches>(responseContent);

            if (launches.count > 0)
            {
                Console.WriteLine();
                foreach (var launch in launches.results)
                {
                    Console.WriteLine($"{launch.name} - {launch.net}");
                }
            }
            else
                Console.WriteLine("Rocket launches were not found.");

            Console.ReadLine();
        }
    }

    public class Launch
    {
        public string? name { get; set; }
        public string? net { get; set; }
    }

    public class Launches
    {
        public int count { get; set; }
        public Launch[]? results { get; set; }
    }
}
