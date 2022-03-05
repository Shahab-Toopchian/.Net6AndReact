using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                _context.Remove(activity);
                var res = await _context.SaveChangesAsync()>0;

                if (!res)
                {
                    return Result<Unit>.Failure("Failed to delete activity");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}